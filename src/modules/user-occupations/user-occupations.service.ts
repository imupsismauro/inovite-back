import {Injectable, UseGuards} from '@nestjs/common';
import {CreateUserOccupationDto} from './dto/create-user-occupation.dto';
import {UpdateUserOccupationDto} from './dto/update-user-occupation.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserOccupation} from './entities/user-occupation.entity';
import {Repository} from 'typeorm';
import {User} from '../users/entities/user.entity';
import {RolesService} from '../roles/roles.service';

@Injectable()
export class UserOccupationsService
{
    constructor(
        @InjectRepository(UserOccupation)
        private userOccupationsRepository: Repository<UserOccupation>
    ) {
    }

    create(createUserOccupationDto: CreateUserOccupationDto) {
        return 'This action adds a new userOccupation';
    }

    async findAll(user: User)
    {
        if (user.is_admin === 0) {
            const occupation = await this.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
            if (occupation && occupation.code === 'sindico') {
                return await this.userOccupationsRepository.find({
                    where: {
                        sindico_view: 1
                    },
                    order: {
                        sort_order: 'ASC'
                    }
                });
            }
        }

        return await this.userOccupationsRepository.find({
            order: {
                sort_order: 'ASC'
            }
        });
    }

    async findByCondominiumUser(condominiumId: number, userId: number)
    {
        return await this.userOccupationsRepository.createQueryBuilder('uo')
            .innerJoin('condominium_users', 'condu', 'condu.user_id = :userId AND condu.condominium_id = :condominiumId', {userId, condominiumId})
            .select(['uo.id', 'uo.name', 'uo.code', 'uo.color'])
            .where('condu.occupation_id = uo.id')
            .getOne();
    }

    async findByCondominiumUserOne(userId: number)
    {
        return await this.userOccupationsRepository.createQueryBuilder('uo')
            .innerJoin('condominium_users', 'condu', 'condu.user_id = :userId', {userId})
            .where('condu.occupation_id = uo.id')
            .getOne();
    }

    async findOne(id: number) {
        return await this.userOccupationsRepository.findOne({id});
    }

    update(id: number, updateUserOccupationDto: UpdateUserOccupationDto) {
        return `This action updates a #${id} userOccupation`;
    }

    remove(id: number) {
        return `This action removes a #${id} userOccupation`;
    }
}
