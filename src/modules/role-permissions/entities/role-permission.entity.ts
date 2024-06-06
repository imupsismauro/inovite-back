import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from '../../roles/entities/role.entity';
import {Permission} from '../../permissions/entities/permission.entity';

@Entity('role_permissions')
export class RolePermission
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_id: number;

    @Column()
    permission_id: number;

    @ManyToOne(() => Role, role => role.rolePermissions)
    @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
    role: Role;

    @ManyToOne(() => Permission, permission => permission.rolePermissions)
    @JoinColumn({name: 'permission_id', referencedColumnName: 'id'})
    permission: Permission;
}
