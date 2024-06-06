import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class AuthGuards extends AuthGuard('jwt') {
}
