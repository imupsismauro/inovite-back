import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {CondominiumsService} from "../modules/condominiums/condominiums.service";
import {UsersService} from "../modules/users/users.service";
import {jwtConstants} from "./auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private _condominiumsService: CondominiumsService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromUrlQueryParameter('token')
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any)
    {
        const condominium = await this._condominiumsService.findActive(payload.sub);
        const userDB = await this.usersService.findOne(payload.sub);

        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            is_admin: payload.is_admin,
            status: payload.status,
        };
    }
}
