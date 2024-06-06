// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './auth.constants';
import {UsersModule} from "../modules/users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../modules/users/entities/user.entity";
import {HttpModule} from "@nestjs/axios";
import {JwtStrategy} from "./jwt.strategy";
import {CondominiumsModule} from "../modules/condominiums/condominiums.module";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        UsersModule,
        HttpModule,
        CondominiumsModule,
        TypeOrmModule.forFeature([User,])
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
