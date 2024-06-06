import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToMany, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('enterprise')
export class Enterprise {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    name?: string;

    @Column({nullable: true})
    cnpj?: string;

    @Column({nullable: true})
    email?: string;
    @Column({nullable: true})
    phone?: string;

    @Column({nullable: true})
    address?: string;

    @Column({nullable: true})
    city?: string;

    @Column({nullable: true})
    district?: string;

    @Column({nullable: true})
    state?: string;

    @Column({nullable: true})
    country?: string;

    @Column({nullable: true})
    number?: number;

    @CreateDateColumn()
    created_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @ManyToOne(() => User, user => user.enterprise)
    @JoinColumn({name: 'id', referencedColumnName: 'enterprise_id'})
    user: User;
}
