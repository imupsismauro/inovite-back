import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from '../../roles/entities/role.entity';
import {RolePermission} from '../../role-permissions/entities/role-permission.entity';
import {UserPermission} from "../../user-permissions/entities/user-permission.entity";

@Entity('permissions')
export class Permission
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    module_id: number;

    @ManyToMany(() => Role, role => role.permissions)
    roles: RolePermission[];

    @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
    rolePermissions: RolePermission[];

  /*  @ManyToOne(() => Module, module => module.permissions)
    @JoinColumn({name: 'module_id', referencedColumnName: 'id'})
    module: Module;*/

    @OneToMany(() => UserPermission, user_permissions => user_permissions.permission)
    @JoinColumn({name: 'id', referencedColumnName: 'permission_id'})
    user_permissions: UserPermission[];
}
