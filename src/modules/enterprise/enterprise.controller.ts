import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req} from '@nestjs/common';
import {EnterpriseService} from './enterprise.service';
import {CreateEnterpriseDto} from './dto/create-enterprise.dto';
import {UpdateEnterpriseDto} from './dto/update-enterprise.dto';
import {AuthGuards} from "../../auth/auth.guards";

@UseGuards(new AuthGuards())
@Controller('enterprise')
export class EnterpriseController {
    constructor(private readonly enterpriseService: EnterpriseService) {
    }

    @Post()
    async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
        return await this.enterpriseService.create(createEnterpriseDto);
    }

    @Get('findAll')
    async findAll(@Param('search') search: string,) {
        return await this.enterpriseService.findAll(search);
    }

    @Post('select/')
    async select(@Body() body: any, @Req() req) {
        return await this.enterpriseService.select(+body.id, req.user);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.enterpriseService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
        return await this.enterpriseService.update(+id, updateEnterpriseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.enterpriseService.remove(+id);
    }
}
