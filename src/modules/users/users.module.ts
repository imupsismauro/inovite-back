import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {CondominiumsModule} from '../condominiums/condominiums.module';
import {RolesModule} from '../roles/roles.module';
import {CondominiumUser} from '../condominiums/entities/condominium-user.entity';
import {UserOccupation} from '../user-occupations/entities/user-occupation.entity';
import {UserOccupationsModule} from '../user-occupations/user-occupations.module';
import {RolePermission} from '../role-permissions/entities/role-permission.entity';
import {Role} from '../roles/entities/role.entity';
import {UserPermission} from "../user-permissions/entities/user-permission.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, CondominiumUser, UserOccupation, RolePermission, Role, UserPermission]),
        CondominiumsModule,
        RolesModule,
        UserOccupationsModule,
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {
}
