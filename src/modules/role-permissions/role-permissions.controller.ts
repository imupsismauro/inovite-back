import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import {RolePermissionsService} from './role-permissions.service';
import {CreateRolePermissionDto} from './dto/create-role-permission.dto';
import {UpdateRolePermissionDto} from './dto/update-role-permission.dto';
/*import {AuthGuards} from '../auth/guards/auth.guards';*/
import {Permission} from '../../decorators/role.decorator';
/*import {RoleGuard} from '../auth/guards/role.guard';*/

@Controller('role-permissions')
/*@UseGuards(new AuthGuards())*/
export class RolePermissionsController {
    constructor(private readonly rolePermissionsService: RolePermissionsService) {
    }

    @Post()
    @Permission('settings_permission_update')
    /*@UseGuards(RoleGuard)*/
    async create(@Body() createRolePermissionDto: CreateRolePermissionDto, @Req() req)
    {
        return await this.rolePermissionsService.create(createRolePermissionDto, req.user);
    }

    @Get()
    findAll() {
        return this.rolePermissionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolePermissionsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto)
    {
        return this.rolePermissionsService.update(+id, updateRolePermissionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string)
    {
        return await this.rolePermissionsService.remove(+id);
    }
}
