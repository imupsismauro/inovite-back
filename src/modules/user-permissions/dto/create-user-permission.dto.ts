import {IsNotEmpty, IsNumber} from "class-validator";
import {DeleteDateColumn} from "typeorm";

export class CreateUserPermissionDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    permission_id: number;

    @DeleteDateColumn()
    deleted_at?: Date;
}
