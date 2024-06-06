import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCondominiumDto} from './dto/create-condominium.dto';
import {UpdateCondominiumDto} from './dto/update-condominium.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Condominium} from './entities/condominium.entity';
import {Repository} from 'typeorm';
import {CondominiumUser} from './entities/condominium-user.entity';
import {User} from '../users/entities/user.entity';
import {CreateCondominiumUserDto} from './dto/create-condominium-user.dto';
import {IPaginationOptions, paginate} from 'nestjs-typeorm-paginate';

@Injectable()
export class CondominiumsService
{
    /**
     * Constructor
     *
     * @param condominiumRepository
     * @param condominiumUserRepository
     */
    constructor(
        @InjectRepository(Condominium)
        private condominiumRepository: Repository<Condominium>,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the condominium
     *
     * @param createCondominiumDto
     */
    async create(createCondominiumDto: CreateCondominiumDto)
    {
        const condominium = await this.condominiumRepository.create(createCondominiumDto);
        await this.condominiumRepository.save(createCondominiumDto);

        return condominium;
    }

    /**
     * Get the all condominiums
     */
    async findAll(options: IPaginationOptions, search: string = '', user: User)
    {
        const query = this.condominiumRepository.createQueryBuilder('c')
            .leftJoinAndSelect('c.units', 'u')
            .leftJoinAndSelect('c.condominiumUser', 'cc')
            .where('cc.user_id = :userId', {userId: user.id})
            .andWhere('c.active = 1');

        if (search !== '') {
            query.andWhere('(c.name ILIKE :term1 OR CAST(c.code AS TEXT) ILIKE :term2)', {
                term1: `%${search}%`,
                term2: `%${search}%`,
            })
        }

        query.orderBy('c.name', 'ASC')

        return await paginate<Condominium>(query, options);

        // return await paginate<Condominium>(this.condominiumRepository, options, {
        //     relations: ['units', 'units.users', 'condominiumUser'],
        //     where: {
        //         condominiumUser: {
        //             user_id: user.id
        //         },
        //         name: ILike('%' + search + '%')
        //     },
        //     order: {
        //         name: 'ASC'
        //     }
        // })
    }

    async findOne(id: number) {
        return this.condominiumRepository.findOne(
            {id: id},
        );
    }
    /*async findConsultor(id: number) {
        return await this.condominiumUserRepository.createQueryBuilder('cu')
            .select(['cu', 'condominium', 'user.name', 'user.phone', 'user.email', 'user.photo'])
            .innerJoin('cu.condominium', 'condominium')
            .innerJoin('cu.user', 'user')
            .where('cu.condominium_id = :condominiumId', {condominiumId: id})
            .andWhere('cu.occupation_id = 5')
            .getOne()

    }

    async findPreposto(id: number) {
        return await this.condominiumUserRepository.createQueryBuilder('cu')
            .select(['cu', 'condominium', 'user.name', 'user.phone', 'user.email', 'user.photo'])
            .innerJoin('cu.condominium', 'condominium')
            .innerJoin('cu.user', 'user')
            .where('cu.condominium_id = :condominiumId', {condominiumId: id})
            .andWhere('cu.occupation_id = 13')
            .getOne()

    }*/

    /**
     * Get condominium active
     */
    async findActive(userId: number)
    {
        return 1
/*        return await this.condominiumUserRepository.findOne({
            user_id: userId,
            active: 1
        }, {
            relations: ['condominium']
        });*/
    }

    /**
     * Get the condominium by code
     *
     * @param code
     */
    async findByCode(code: number)
    {
        return await this.condominiumRepository.findOne({code});
    }

    update(id: number, updateCondominiumDto: UpdateCondominiumDto) {
        return `This action updates a #${id} condominium`;
    }

    remove(id: number) {
        return `This action removes a #${id} condominium`;
    }

    /**
     * Set user condominium active
     *
     * @param id
     * @param user
     */
    async select(id: number, user: User)
    {/*
        const condominiumActive = await this.condominiumRepository.findOne({id});

        if (condominiumActive.active === 0) {
            await this.condominiumUserRepository.update({
                user_id: user.id
            }, {active: 0});

            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        await this.condominiumUserRepository.update({
            user_id: user.id
        }, {active: 0})

        if (id === -1) {
            return;
        }

        const condominium = await this.condominiumUserRepository.findOne({
            condominium_id: id,
            user_id: user.id,
        });

        if (!condominium) {
            const dto: CreateCondominiumUserDto = {
                condominium_id: id,
                user_id: user.id,
                active: 1
            }
/!*
            await this.condominiumUserRepository.create(dto);
            await this.condominiumUserRepository.save(dto);*!/

            return {
                selected: true
            };
        }

        await this.condominiumUserRepository.update({
            condominium_id: id,
            user_id: user.id,
        }, {active: 1});

        console.log('updated');

        return {
            selected: true
        };*/
    }

    async setAdmin(userId: number, roleId: number, occupationId: number)
    {
        /*const condominiums = await this.condominiumRepository.find();
        await Promise.all(condominiums.map(async (condominium) => {
            const relation = await this.condominiumUserRepository.findOne({
                user_id: userId,
                condominium_id: condominium.id
            });

            if (!relation) {
                const dto: CreateCondominiumUserDto = {
                    user_id: userId,
                    condominium_id: condominium.id,
                    role_id: roleId,
                    occupation_id: occupationId,
                    active: 0
                }

                await this.condominiumUserRepository.create(dto);
                await this.condominiumUserRepository.save(dto);
            }
        }));

        return {
            relations: true
        }*/
    }
}
