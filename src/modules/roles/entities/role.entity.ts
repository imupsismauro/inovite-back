import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {Permission} from '../../permissions/entities/permission.entity';
import {RolePermission} from '../../role-permissions/entities/role-permission.entity';
import {CondominiumUser} from '../../condominiums/entities/condominium-user.entity';

@Entity('roles')
export class Role
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    condominium_id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[];

    @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    @JoinColumn({name: 'id', referencedColumnName: 'role_id'})
    rolePermissions: RolePermission[];

    @OneToMany(() => User, user => user.role)
    @JoinColumn({name: 'id', referencedColumnName: 'role_id'})
    users: User[];

    @OneToOne(() => CondominiumUser)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    condominiumUser: CondominiumUser;
}
