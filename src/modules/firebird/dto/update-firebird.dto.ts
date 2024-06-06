import { PartialType } from '@nestjs/mapped-types';
import { CreateFirebirdDto } from './create-firebird.dto';

export class UpdateFirebirdDto extends PartialType(CreateFirebirdDto) {}
