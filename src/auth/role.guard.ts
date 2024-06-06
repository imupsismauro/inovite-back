import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate
{
    /**
     * Constructor
     */
    constructor(
        //private roleService: RolesService,
        private reflector: Reflector,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check if user has permission to access method
     *
     * @param context
     */
    async hasPermission(context: ExecutionContext)
    {
        const permission = this.reflector.get<string>('permission', context.getHandler());
        const request = context.switchToHttp().getRequest();
        //const user = request.user as User;

     /*   if (user.is_admin) {
            return true;
        }*/

        // const role = await this.roleService.findByCondominiumUser(user.condominium_active.condominium_id, user.id);
        // if (!role || !role.permissions.find(x => x.code === permission)) {
        //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        // }

        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param context
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        return this.hasPermission(context);
    }
}
