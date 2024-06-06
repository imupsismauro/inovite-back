import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    document?: string;

    role_id?: number;
    occupation_id?: number;
    password?: string;
    reset_token?: string;
    remote_id?: number;
    confirmation_token?: string;
    admin?: boolean;
    is_admin?: number;
    created_at?: Date;
}
