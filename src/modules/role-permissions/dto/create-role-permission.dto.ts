import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateRolePermissionDto
{
    @IsNumber()
    @IsNotEmpty()
    role_id: number;

    @IsNumber()
    @IsNotEmpty()
    permission_id: number;
}
