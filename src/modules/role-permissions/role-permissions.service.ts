import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRolePermissionDto} from './dto/create-role-permission.dto';
import {UpdateRolePermissionDto} from './dto/update-role-permission.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {RolePermission} from './entities/role-permission.entity';
import {Repository} from 'typeorm';
import {RolesService} from '../roles/roles.service';
import {User} from '../users/entities/user.entity';
import {Permission} from '../permissions/entities/permission.entity';

@Injectable()
export class RolePermissionsService
{
    constructor(
        @InjectRepository(RolePermission)
        private rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,

        private rolesService: RolesService,
    ) {
    }

    async create(createRolePermissionDto: CreateRolePermissionDto, user: User)
    {
        const role = await this.rolesService.findOne(createRolePermissionDto.role_id);
        if (!role) {
            throw new HttpException('Função não encontrada', HttpStatus.BAD_REQUEST);
        }

        if (role.condominium_id !== user.condominium_active.condominium_id) {
            throw new HttpException('Essa função não faz parte do condomínio ativo', HttpStatus.BAD_REQUEST);
        }

        const permission = await this.rolePermissionRepository.findOne({
            where: {
                role_id: createRolePermissionDto.role_id,
                permission_id: createRolePermissionDto.permission_id
            }
        })

        if (permission) {
            await this.rolePermissionRepository.delete({
                id: permission.id
            })


            return {
                message: 'Permissão removida'
            }
        }

        await this.rolePermissionRepository.create(createRolePermissionDto);
        const p = await this.rolePermissionRepository.save(createRolePermissionDto);


        return p;
    }

    findAll() {
        return `This action returns all rolePermissions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} rolePermission`;
    }

    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        return `This action updates a #${id} rolePermission`;
    }

    async remove(id: number)
    {
        await this.rolePermissionRepository.delete({id});

        return {
            deleted: true
        }
    }
}
