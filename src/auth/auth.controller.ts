// auth/auth.controller.ts
import {Body, Controller, HttpException, Post, Req, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {NoAuthGuards} from "./noAuth.guards";
import {AuthGuards} from "./auth.guards";

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    // @UseGuards(NoAuthGuards)
    @Post('sign-in')
    async signIn(
        @Request() req,
        @Body() body
    )
    {
         return await this.authService.signIn(body);
    }

    @Post('sign-up')
    async signUp(@Body() body: any)
    {
        return await this.authService.signUp(body);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body, @Req() req)
    {
        return await this.authService.forgotPassword(body.email, req);
    }

    @Post('reset-password')
    async resetPassword(@Body() body, @Req() req)
    {
        return await this.authService.resetPassword(body.token, body.password, req);
    }

    @Post('user-password')
    async userPassword(@Body() body, @Req() req)
    {
        return await this.authService.userPassword(body.token, body.password, req);
    }

    @Post('update-password')
    @UseGuards(AuthGuards)
    async updatePassword(@Body() body, @Req() req)
    {
        return await this.authService.updatePassword(body.current_password, body.password, req.user);
    }
}
