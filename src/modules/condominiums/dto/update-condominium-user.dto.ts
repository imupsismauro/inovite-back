import {IsEmpty, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';
import {CreateCondominiumUserDto} from './create-condominium-user.dto';

export class UpdateCondominiumUserDto extends PartialType(CreateCondominiumUserDto) {}
