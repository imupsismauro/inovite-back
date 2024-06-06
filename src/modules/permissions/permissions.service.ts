import {Injectable} from '@nestjs/common';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Permission} from './entities/permission.entity';
import {Repository} from 'typeorm';

@Injectable()
export class PermissionsService
{
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>
    ) {
    }

    create(createPermissionDto: CreatePermissionDto) {
        return 'This action adds a new permission';
    }

    async findAll()
    {
        return await this.permissionsRepository.find({
            relations: ['module']
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }

    update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return `This action updates a #${id} permission`;
    }

    remove(id: number) {
        return `This action removes a #${id} permission`;
    }

    async removeAll()
    {
        const permissions = await this.permissionsRepository.find();
        return await this.permissionsRepository.remove(permissions);
    }
}
