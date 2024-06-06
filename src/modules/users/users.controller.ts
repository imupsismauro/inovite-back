import {Body, Controller, DefaultValuePipe, Delete, Get, Ip, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PaginationTypeEnum} from 'nestjs-typeorm-paginate';
import {Permission} from '../../decorators/role.decorator';
import { AuthGuards } from '../../auth/auth.guards';

@UseGuards(new AuthGuards())
@Controller('users')
export class UsersController {

    /**
     * Constructor
     *
     * @param usersService
     */
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    @Post()
    @Permission('settings_collaborator_create')
    async create(@Body() createUserDto: CreateUserDto, @Req() req)
    {
        return await this.usersService.create(createUserDto, req.headers, req.ip, req.user)
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req,
        @Ip() ip
    ) {
        return await this.usersService.update(+id, updateUserDto, req.headers, ip, req.user);
    }

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Query('occupationId', new DefaultValuePipe(0), ParseIntPipe) occupationId: number = 10,
        @Query('search') search: string = '',
        @Req() req
    )
    {
        return await this.usersService.findAll({page, limit, paginationType: PaginationTypeEnum.TAKE_AND_SKIP}, search, occupationId, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req)
    {
        return await this.usersService.remove(+id);
    }

    @Get('me')
    async me(@Req() req)
    {
        console.log(req.user)
        return await this.usersService.findMe(req.user);
    }

    @Get('reset-password/:id')
    async resetPasswordLink(@Param('id') id: string, @Req() req)
    {
        return await this.usersService.resetPasswordLink(+id, req.user);
    }
}
