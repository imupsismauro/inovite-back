import {Module} from '@nestjs/common';
import {CondominiumsService} from './condominiums.service';
import {CondominiumsController} from './condominiums.controller';
import {RolesModule} from '../roles/roles.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Condominium} from './entities/condominium.entity';
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Condominium]),
        RolesModule,
    ],
    controllers: [
        CondominiumsController
    ],
    providers: [
        CondominiumsService
    ],
    exports: [
        CondominiumsService
    ]
})
export class CondominiumsModule {
}
