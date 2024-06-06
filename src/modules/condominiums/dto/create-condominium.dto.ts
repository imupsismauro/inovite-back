import {IsEmpty, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateCondominiumDto
{
    @IsNumber()
    @IsNotEmpty()
    code: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    thumbnail: string;

    active: number;
}
