import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import {UserOccupationsService} from './user-occupations.service';
import {CreateUserOccupationDto} from './dto/create-user-occupation.dto';
import {UpdateUserOccupationDto} from './dto/update-user-occupation.dto';

@Controller('user-occupations')
/*@UseGuards(new AuthGuards())*/
export class UserOccupationsController {

    constructor(
        private readonly userOccupationsService: UserOccupationsService
    ) {
    }

    @Post()
    create(@Body() createUserOccupationDto: CreateUserOccupationDto) {
        return this.userOccupationsService.create(createUserOccupationDto);
    }

    @Get()
    async findAll(@Req() req)
    {
        return await this.userOccupationsService.findAll(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userOccupationsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserOccupationDto: UpdateUserOccupationDto) {
        return this.userOccupationsService.update(+id, updateUserOccupationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userOccupationsService.remove(+id);
    }
}
