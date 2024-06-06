import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    JoinColumn,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Permission} from "../../permissions/entities/permission.entity";
@Entity('user_permissions')
export class UserPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    permission_id: number;

    @DeleteDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    deleted_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

/*    @ManyToOne(() => User, user => user.user_permissions)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;*/

    @ManyToOne(() => Permission, permission => permission.user_permissions)
    @JoinColumn({name: 'permission_id', referencedColumnName: 'id'})
    permission: Permission;
}
