import {IsNotEmpty, IsString} from 'class-validator';

export class CreateRoleDto
{
    condominium_id: number;
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
