import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Query,
    DefaultValuePipe, ParseIntPipe
} from '@nestjs/common';
import {CondominiumsService} from './condominiums.service';
import {CreateCondominiumDto} from './dto/create-condominium.dto';
import {UpdateCondominiumDto} from './dto/update-condominium.dto';
/*import {AuthGuards} from '../auth/guards/auth.guards';*/
import {PaginationTypeEnum} from 'nestjs-typeorm-paginate';

@Controller('condominiums')
export class CondominiumsController
{
    constructor(
        private readonly condominiumsService: CondominiumsService
    ) {
    }

/*    @UseGuards(AuthGuards)*/
    @Post()
    async create(@Body() createCondominiumDto: CreateCondominiumDto)
    {
        return await this.condominiumsService.create(createCondominiumDto);
    }
    // @UseGuards(AuthGuards)
    @Get('consultor')
    async findConsultor(
        @Req() req
    ) {
        //return await this.condominiumsService.findConsultor(+req.user.condominium_active.condominium_id);
    }

    // @UseGuards(AuthGuards)
    @Get('preposto')
    async findPreposto(
        @Req() req
    ) {
        //return await this.condominiumsService.findPreposto(+req.user.condominium_active.condominium_id);
    }

    // @UseGuards(AuthGuards)
    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Query('search') search: string = '',
        @Req() req)
    {
        return await this.condominiumsService.findAll({page, limit, paginationType: PaginationTypeEnum.TAKE_AND_SKIP}, search, req.user);
    }

    // @UseGuards(AuthGuards)
    @Post('select')
    async select(@Body() body: any, @Req() req)
    {
        return await this.condominiumsService.select(body.id, req.user);
    }

    @Post('set-admin')
    async setAdmin(@Body() body: any)
    {
        return await this.condominiumsService.setAdmin(body.user_id, 0, 0);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.condominiumsService.findOne(+id);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCondominiumDto: UpdateCondominiumDto) {
        return this.condominiumsService.update(+id, updateCondominiumDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.condominiumsService.remove(+id);
    }

    @Post('env')
    getEnv()
    {
        return process.env.ENV;
    }
}
