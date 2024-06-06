import {IsEmpty, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateCondominiumUserDto
{
    @IsNumber()
    @IsNotEmpty()
    condominium_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    active: number;
    role_id?: number;
    occupation_id?: number;
}
