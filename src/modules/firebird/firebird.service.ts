import { Injectable } from '@nestjs/common';
import { CreateFirebirdDto } from './dto/create-firebird.dto';
import { UpdateFirebirdDto } from './dto/update-firebird.dto';

@Injectable()
export class FirebirdService {
  create(createFirebirdDto: CreateFirebirdDto) {
    return 'This action adds a new firebird';
  }

  findAll() {
    return `This action returns all firebird`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firebird`;
  }

  update(id: number, updateFirebirdDto: UpdateFirebirdDto) {
    return `This action updates a #${id} firebird`;
  }

  remove(id: number) {
    return `This action removes a #${id} firebird`;
  }
}
