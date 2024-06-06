import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOccupationDto } from './create-user-occupation.dto';

export class UpdateUserOccupationDto extends PartialType(CreateUserOccupationDto) {}
