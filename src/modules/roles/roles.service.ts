import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from './entities/role.entity';
import {Repository} from 'typeorm';
import {User} from '../users/entities/user.entity';
import {CondominiumsService} from '../condominiums/condominiums.service';
import * as slugify from 'slugify';

@Injectable()
export class RolesService
{
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private condominiumsService: CondominiumsService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async create(createRoleDto: CreateRoleDto, user: User)
    {
/*
        const condominium = await this.condominiumsService.findActive(user.id);

        createRoleDto.condominium_id = condominium.condominium_id;
        createRoleDto.code = slugify.default(createRoleDto.name, '-').toLowerCase();

        await this.roleRepository.create(createRoleDto);
        const role = await this.roleRepository.save(createRoleDto);
*/

return 1
        //return await this.findOne(role.id);
    }

    /**
     * Get all roles
     */
    async findAll(user: User)
    {
        return await this.roleRepository.find({
            relations: ['permissions'],
            where: {
                condominium_id: user.condominium_active.condominium_id
            }
        });
    }

    /**
     * Get role by id
     *
     * @param id
     */
    findOne(id: number)
    {
        return this.roleRepository.findOne(
            {id},{
            relations: ['permissions']
        });
    }

    async findByCondominium(condominiumId: number)
    {
        return await this.roleRepository.find({
            where: {
                condominium_id: condominiumId
            }
        })
    }

    async findByCondominiumUser(condominiumId: number, userId: number)
    {
        return await this.roleRepository.createQueryBuilder('r')
            .innerJoin('condominium_users', 'condu', 'condu.user_id = :userId AND condu.condominium_id = :condominiumId', {userId, condominiumId})
            .leftJoinAndSelect('r.permissions', 'p')
            .where('condu.role_id = r.id')
            .getOne();
    }

    async findByCondominiumUserOne(userId: number)
    {
        return await this.roleRepository.createQueryBuilder('r')
            .innerJoin('condominium_users', 'condu', 'condu.user_id = :userId', {userId})
            .leftJoinAndSelect('r.permissions', 'p')
            .where('condu.role_id = r.id')
            .getOne();
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    async remove(id: number)
    {
        const role = await this.roleRepository.findOne(id, {
            relations: ['users']
        });

        if (role.users.length) {
            throw new HttpException('Essa função não pode ser removida, pois possui usuários associados a ela', HttpStatus.BAD_REQUEST);
        }

        await this.roleRepository.delete(id);

        return {
            message: 'Função removida'
        }
    }
}
