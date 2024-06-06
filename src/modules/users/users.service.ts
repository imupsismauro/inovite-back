import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {CondominiumsService} from '../condominiums/condominiums.service';
import {CondominiumUser} from '../condominiums/entities/condominium-user.entity';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateCondominiumUserDto} from '../condominiums/dto/create-condominium-user.dto';
import { v4 as uuid } from 'uuid';
import {IPaginationOptions, paginate} from 'nestjs-typeorm-paginate';
import {UserOccupation} from '../user-occupations/entities/user-occupation.entity';
import {RolesService} from '../roles/roles.service';
import {UserOccupationsService} from '../user-occupations/user-occupations.service';
import {RolePermission} from '../role-permissions/entities/role-permission.entity';
import {UserPermission} from "../user-permissions/entities/user-permission.entity";

@Injectable()
export class UsersService
{
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private condominiumsService: CondominiumsService,

        @InjectRepository(UserOccupation)
        private userOccupationRepository: Repository<UserOccupation>,

        @InjectRepository(RolePermission)
        private rolePermissionRepository: Repository<RolePermission>,

        @InjectRepository(UserPermission)
        private userPermissionsRepository: Repository<UserPermission>,

        @InjectRepository(CondominiumUser)
        private condominiumUserRepository: Repository<CondominiumUser>,

        private rolesService: RolesService,
        private userOccupationsService: UserOccupationsService,
    ) {
    }

    /**
     * Create the new user
     *
     */
    async create(createUserDto: CreateUserDto, headers: any, ip: string, user: User)
    {
        if (user.is_admin === 0) {
            const userOccupation = await this.userOccupationsService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
            if (!userOccupation || (userOccupation && !['admin', 'consultor', 'preposto'].includes(userOccupation.code) && user.is_admin === 0)) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        }

        if (await this.userRepository.findOne({email: createUserDto.email})) {
            throw new HttpException('Esse email já esta cadastrado!', HttpStatus.BAD_REQUEST);
        }

        if (await this.userRepository.findOne({document: createUserDto.document})) {
            throw new HttpException('Esse documento já esta cadastrado!', HttpStatus.BAD_REQUEST);
        }

        if (createUserDto.occupation_id === 2) {
            const perfil = await this.condominiumUserRepository.find({occupation_id: createUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id});

            if (perfil.length >= 2) {
                throw new HttpException('Já existe síndico cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }

        if (createUserDto.occupation_id === 8) {
            const perfil = await this.condominiumUserRepository.find({occupation_id: createUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id});

            if (perfil.length >= 2) {
                throw new HttpException('Já existe subsíndico cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }

        if (createUserDto.occupation_id === 5) {
            if(await this.condominiumUserRepository.findOne({occupation_id: createUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id}))
            {
                throw new HttpException('Já existe consultor cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }



        createUserDto.password = await bcrypt.hash(createUserDto.password ? createUserDto.password : 'cipafacil@2022', 12);
        createUserDto.confirmation_token = uuid();
        createUserDto.created_at = new Date();
        createUserDto.remote_id = null;
        createUserDto.is_admin = 0;

        await this.userRepository.create(createUserDto);
        const newUser = await this.userRepository.save(createUserDto);

        const occupation = await this.userOccupationRepository.findOne({id: createUserDto.occupation_id});
        if (occupation && occupation.code === 'admin') {
            await this.condominiumsService.setAdmin(newUser.id, createUserDto.role_id, createUserDto.occupation_id);
        } else if (occupation && occupation.code !== 'admin') {
            if (!createUserDto.admin) {
                const dto: CreateCondominiumUserDto = {
                    user_id: newUser.id,
                    condominium_id: user.condominium_active.condominium_id,
                    role_id: createUserDto.role_id,
                    occupation_id: createUserDto.occupation_id,
                    active: 0
                }

                await this.condominiumUserRepository.create(dto);
                const condUser = await this.condominiumUserRepository.save(dto);

            }
        }

        const sendMailDto = {
            condominium_id: user.condominium_active.condominium_id,
            to: newUser.name,
            request: createUserDto,
            externalLink: 'https://cipafacil.digital/user-password?token=' + newUser.confirmation_token
        };

       /* await this.mailService.send(newUser.email, 'Bem vindo ao novo Cipa Fácil', 'create-password', user.condominium_active.condominium_id, sendMailDto);*/

        return await this.findOne(newUser.id);
    }

    async update(id: number, updateUserDto: UpdateUserDto, headers: any, ip: string, user?: User)
    {
        const role = await this.rolesService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
        const occupation = await this.userOccupationsService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
        if (
            !role ||
            (id !== user.id && !role.permissions.find(x => x.code === 'settings_collaborator_update') && user.is_admin === 0) ||
            (id !== user.id && !['admin', 'consultor', 'preposto'].includes(occupation.code) && user.is_admin === 0)
        ) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const occupationUser = await this.userOccupationsService.findByCondominiumUser(user.condominium_active.condominium_id, id);
        const occupationUpdated = await this.userOccupationsService.findOne(updateUserDto.occupation_id);
        if (updateUserDto.occupation_id && ['admin', 'consultor', 'preposto'].includes(occupationUpdated.code) && !['admin', 'consultor', 'preposto'].includes(occupationUser.code) && user.is_admin === 0)
        {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const userEmail = await this.userRepository.findOne({email: updateUserDto.email});
        if (userEmail && userEmail.id !== id) {
            throw new HttpException('Esse email já esta cadastrado!', HttpStatus.BAD_REQUEST);
        }

        const userDocument = await this.userRepository.findOne({document: updateUserDto.document});
        if (userDocument && userDocument.id !== id) {
            throw new HttpException('Esse documento já esta cadastrado!', HttpStatus.BAD_REQUEST);
        }

        if (updateUserDto.occupation_id === 2) {
            const perfil = await this.condominiumUserRepository.find({occupation_id: updateUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id});

            if (perfil.length >= 2 && perfil.filter(x => x.user_id !== id).length >= 2) {
                throw new HttpException('Já existe síndico cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }

        if (updateUserDto.occupation_id === 8) {
            const perfil = await this.condominiumUserRepository.find({occupation_id: updateUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id});

            if (perfil.length >= 2 && perfil.filter(x => x.user_id !== id).length >= 2) {
                throw new HttpException('Já existe subsíndico cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }

        if (updateUserDto.occupation_id === 5) {
            const perfil = await this.condominiumUserRepository.findOne({occupation_id: updateUserDto.occupation_id, condominium_id: user.condominium_active.condominium_id});

            if (perfil && perfil.user_id !== id)
            {
                throw new HttpException('Já existe consultor cadastrado para esse condomínio', HttpStatus.BAD_REQUEST);
            }
        }


        const condominiumUser = await this.condominiumUserRepository.findOne({user_id: id, condominium_id: user.condominium_active.condominium_id});
        if (condominiumUser && updateUserDto.role_id && updateUserDto.occupation_id) {

            await this.condominiumUserRepository.update(condominiumUser.id, {
                role_id: updateUserDto.role_id,
                occupation_id: updateUserDto.occupation_id
            });
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
        }


        const emailDb = await this.userRepository.findOne({id});
        if (emailDb.email !== updateUserDto.email) {
            const permissions = await this.rolePermissionRepository.find({
                where: {
                    role_id: updateUserDto.role_id
                },
                relations: ['permission']
            })

            if (permissions.length) {
                for (const permission of permissions) {
                    if (permission.permission_id === 61) {
                        const emails = [
                            'jakson.lucas@cipa.com.br',
                            'helena.freire@cipa.com.br',
                            'bruno.queiroz@cipa.com.br',
                        ];

                        const sendMailDto = {
                            condominium_id: user.condominium_active.condominium_id,
                            to: user.name,
                            request: {
                                userId: user?.id,
                                userName: user?.name,
                                userEmailId: emailDb?.id,
                                userEmailName: emailDb?.name,
     /*                           condominiumCode: user?.condominium_active?.condominium?.code,
                                condominiumName: user?.condominium_active?.condominium?.name,*/
                            }
                        };

               /*         for (const email of emails) {
                            await this.mailService.send(email, 'Mudança E-mail', 'helena-email', user.condominium_active.condominium_id, sendMailDto);
                        }*/
                    }
                }
            }
        }

        if (updateUserDto.reset_token) {
            updateUserDto.reset_token = '';
        }

        if (updateUserDto.confirmation_token) {
            updateUserDto.confirmation_token = '';
        }

        if (updateUserDto.is_admin && emailDb.is_admin === 0) {
            updateUserDto.is_admin = 0;
        }

        delete updateUserDto.password;

        await this.userRepository.update(
            {id},
            updateUserDto
        );

        return await this.findOne(id);
    }

    /**
     * Get the all units
     */
    async findAll(options: IPaginationOptions, search: string = '', occupationId: number = 0, user: User)
    {
        const query = this.userRepository.createQueryBuilder('u')
            .select(['u.id', 'u.name', 'u.email', 'u.status', 'u.document', 'u.phone'])
            .innerJoin('condominium_users', 'cuser', 'cuser.condominium_id = :condominiumId AND cuser.user_id = u.id', {condominiumId: user.condominium_active.condominium_id})
            .leftJoinAndSelect('user_occupations', 'uo', 'uo.id = cuser.occupation_id')
            .where("uo.code <> 'admin'")
            .orderBy('uo.sort_order', 'ASC')

        if (search !== '') {
            query.andWhere('(u.name ILIKE :term1 OR u.email ILIKE :term2 OR u.document ILIKE :term3)', {
                term1: `%${ search }%`,
                term2: `%${ search }%`,
                term3: `%${ search.replace(/[^a-z0-9]/gi, '') }%`,
            })
        }

        if (occupationId !== 0) {
            query.andWhere('uo.id = :occupationId', {occupationId})
        }

        // query.orderBy('uo.sort_order', 'ASC');

        const users = await paginate<User>(query, options);
        for (const userF of users.items) {
            userF.role = await this.rolesService.findByCondominiumUser(user.condominium_active.condominium_id, userF.id);
            if (userF.role?.permissions) {
                delete userF.role.permissions;
            }
            userF.occupation = await this.userOccupationsService.findByCondominiumUser(user.condominium_active.condominium_id, userF.id);
        }

        return users;
    }

    /**
     * Find unit by id
     *
     * @param id
     * @param withPassword
     */
    async findOne(id: number, withPassword: boolean = false)
    {
        const user = await this.userRepository.findOne({
            where: {id}
        });

        if (!withPassword && user?.password) {
            delete user.password;
        }

        return user;
    }

    /**
     * Get user by auth
     */
    async findMe(user: User)
    {
    /*    const userDb = await this.userRepository.createQueryBuilder('u')
            .select(['u.id', 'u.name', 'u.email', 'u.status', 'u.document', 'u.is_admin', 'u.enterprise_id', 'e.name as enterprise_name'])
            .leftJoinAndSelect('enterprise', 'e', 'e.id = u.enterprise_id')
            .where('u.id = :userId', {userId: user.id})
            .getOne();*/

        const userDb = await this.userRepository.findOne({
            select: ['name', 'email', 'id', 'document', 'is_admin', 'status'],
            where: {
                id: user.id
            },
            relations: ['enterprise']
        });

        if (!userDb || (userDb && userDb.status !== 10)) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

     /*   const condominiumActive = await this.condominiumsService.findActive(user.id);*/

      /*  if (condominiumActive?.condominium?.active === 0) {
            await this.condominiumUserRepository.update({
                user_id: user.id
            }, {active: 0});

            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }*/

 /*       userDb.condominium_active = condominiumActive;
        if (userDb.condominium_active) {
            userDb.role = await this.rolesService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
            userDb.occupation = await this.userOccupationsService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
        } else {
            userDb.role = await this.rolesService.findByCondominiumUserOne(user.id);
            userDb.occupation = await this.userOccupationsService.findByCondominiumUserOne(user.id);
        }*/
        return userDb;
    }

    /**
     * Find email by email
     *
     * @param email
     */
    async findByEmail(email: string)
    {
        return await this.userRepository.findOne({
            select: ['id', 'email', 'password', 'is_admin', 'status', 'name', 'enterprise_id'],
            where: {
                email: email
            }
        })
    }

    /**
     * Find email by reset token
     *
     * @param token
     */
    async findByResetToken(token: string)
    {
        return await this.userRepository.findOne({reset_token: token})
    }

    async remove(id: number)
    {
        const user = await this.userRepository.findOne(id);

        // Remove associations
        await this.condominiumUserRepository.delete({
            user_id: id
        });

        // Update email for null
        await this.userRepository.update({id}, {
            email: null
        });

        // Delete user
        await this.userRepository.softDelete({id});

        return {
            message: 'Usuário removido com sucesso.'
        };
    }

    async resetPasswordLink(id: number, user: User)
    {
        if (!user.is_admin) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = uuid();
        await this.userRepository.update({id: id}, {
            reset_token: token
        });

        return {
            token
        }
    }
}
