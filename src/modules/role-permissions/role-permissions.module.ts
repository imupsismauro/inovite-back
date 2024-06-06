import {Module} from '@nestjs/common';
import {RolePermissionsService} from './role-permissions.service';
import {RolePermissionsController} from './role-permissions.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolePermission} from './entities/role-permission.entity';
import {RolesModule} from '../roles/roles.module';
import {Permission} from '../permissions/entities/permission.entity';
import {UserOccupationsModule} from '../user-occupations/user-occupations.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolePermission, Permission]),
        RolesModule,
        UserOccupationsModule
    ],
    controllers: [
        RolePermissionsController
    ],
    providers: [
        RolePermissionsService
    ],
    exports: [
        RolePermissionsService
    ]
})
export class RolePermissionsModule {
}
