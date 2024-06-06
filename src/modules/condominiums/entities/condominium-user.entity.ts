import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Condominium} from './condominium.entity';
import {User} from '../../users/entities/user.entity';
import {Role} from '../../roles/entities/role.entity';
import {UserOccupation} from '../../user-occupations/entities/user-occupation.entity';

@Entity('condominium_users')
export class CondominiumUser
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    condominium_id: number;

    @Column()
    user_id: number;

    @Column()
    role_id: number;

    @Column()
    occupation_id: number;

    @Column()
    is_supervisor: number;

    @Column()
    active: number;

/*    @OneToOne(() => Condominium, condominium => condominium.condominiumUser)
    @JoinColumn({name: 'condominium_id', referencedColumnName: 'id'})
    condominium: Condominium;

    @OneToOne(() => Role, condominium => condominium.condominiumUser)
    @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
    role: Role;

    @OneToOne(() => UserOccupation, condominium => condominium.condominiumUser)
    @JoinColumn({name: 'occupation_id', referencedColumnName: 'id'})
    occupation: UserOccupation;

    @ManyToOne(() => User, user => user.condominiums)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;*/
}
