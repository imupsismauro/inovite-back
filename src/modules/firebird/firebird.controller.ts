import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirebirdService } from './firebird.service';
import { CreateFirebirdDto } from './dto/create-firebird.dto';
import { UpdateFirebirdDto } from './dto/update-firebird.dto';

@Controller('firebird')
export class FirebirdController {
  constructor(private readonly firebirdService: FirebirdService) {}

  @Post()
  create(@Body() createFirebirdDto: CreateFirebirdDto) {
    return this.firebirdService.create(createFirebirdDto);
  }

  @Get()
  findAll() {
    return this.firebirdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firebirdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFirebirdDto: UpdateFirebirdDto) {
    return this.firebirdService.update(+id, updateFirebirdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.firebirdService.remove(+id);
  }
}
