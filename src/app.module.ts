import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {Service} from './service';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolesModule} from './modules/roles/roles.module';
import {RolePermission} from "./modules/role-permissions/entities/role-permission.entity";
import {UserOccupation} from "./modules/user-occupations/entities/user-occupation.entity";
import {UserPermission} from "./modules/user-permissions/entities/user-permission.entity";
import {ConsoleModule} from "nestjs-console";
import {AuthModule} from "./auth/auth.module";
import { FirebirdModule } from './modules/firebird/firebird.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { BuyersModule } from './modules/buyers/buyers.module';
import { GoalsModule } from './modules/goals/goals.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot(),
        RolesModule,
        RolePermission,
        UserOccupation,
        UserPermission,
        ConsoleModule,
        FirebirdModule,
        EnterpriseModule,
        BuyersModule,
        GoalsModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        Service,
            ],
})
export class AppModule {
}
