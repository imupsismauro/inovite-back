import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, Req} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {Permission} from '../../decorators/role.decorator';
/*import {AuthGuards} from '../auth/guards/auth.guards';
import {RoleGuard} from '../auth/guards/role.guard';*/

@Controller('roles')
/*@UseGuards(new AuthGuards())*/
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @Post()
    @Permission('settings_role_create')
/*    @UseGuards(RoleGuard)*/
    async create(@Body() createRoleDto: CreateRoleDto, @Req() req)
    {
        return await this.rolesService.create(createRoleDto, req.user);
    }

    @Get()
    async findAll(@Request() req)
    {
        return await this.rolesService.findAll(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string)
    {
        return await this.rolesService.remove(+id);
    }
}
