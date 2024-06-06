import {forwardRef, Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {RolesController} from './roles.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Role} from './entities/role.entity';
import {Permission} from '../permissions/entities/permission.entity';
import {CondominiumsModule} from '../condominiums/condominiums.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]),
        forwardRef(() => CondominiumsModule),
    ],
    controllers: [
        RolesController
    ],
    providers: [
        RolesService
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule {
}
