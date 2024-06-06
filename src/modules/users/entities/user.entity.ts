import {
    Column, CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {Role} from '../../roles/entities/role.entity';
import {UserOccupation} from '../../user-occupations/entities/user-occupation.entity';
import {CondominiumUser} from '../../condominiums/entities/condominium-user.entity';
import {UserPermission} from "../../user-permissions/entities/user-permission.entity";
import {Enterprise} from "../../enterprise/entities/enterprise.entity";

@Entity('users')
export class User
{
    condominium_active: CondominiumUser;
    occupation: UserOccupation;
    role: Role;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    document: string;

    @Column({select: false})
    password: string;

    @Column()
    is_admin: number;

    @Column()
    reset_token: string;

    @Column()
    status: number;

    @Column()
    confirmation_token: string;

    @Column()
    enterprise_id: number;

/*    @Column()
    role_id: number;*/

/*    @Column()
    status: number;*/

/*
    @Column()
    document: string;
*/
/*
    @Column()
    phone: string;

    @Column()
    occupation_id: number;

    @Column()
    photo: string;*/

/*    @Column()
    reset_token: string;

    @Column()
    confirmation_token: string;

    @Column()
    remote_id: number;

    @Column()
    signature: string;*/

    admin_permissions;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    last_login_at: Date;
/*
    @ManyToMany(() => Unit, unit => unit.users)
    units: UnitUser[];

    @ManyToMany(() => UnitUser, unitUser => unitUser.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    unit: UnitUser;

    @OneToOne(() => Package, pkg => pkg.receiver)
    @JoinColumn({name: 'id', referencedColumnName: 'receiver_id'})
    package: Package;*/
/*
    @ManyToMany(() => CondominiumUser)
    @JoinTable({
        name: 'condominium_users',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'condominium_id',
            referencedColumnName: 'id'
        }
    })
    condominium_user: CondominiumUser;*/

 /*   @OneToMany(() => CondominiumUser, condominiumUser => condominiumUser.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    condominiums: CondominiumUser[];

    @OneToOne(() => SpaceReservation, reservation => reservation.condomino)
    @JoinColumn({name: 'id', referencedColumnName: 'condomino_id'})
    reservation: User;*/

 /*   @OneToMany(() => UserContact, userContact => userContact.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    contacts: UserContact[];

    @OneToMany(() => Task, task => task.responsible)
    @JoinColumn({name: 'id', referencedColumnName: 'responsible_id'})
    tasks: Task[];

    @OneToMany(() => Task, task => task.requester)
    @JoinColumn({name: 'id', referencedColumnName: 'sender_id'})
    requesterTasks: Task[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.userResponsible)
    @JoinColumn({name: 'id', referencedColumnName: 'responsible_id'})
    serviceOrder: ServiceOrder[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.userRequester)
    @JoinColumn({name: 'id', referencedColumnName: 'requester_id'})
    userRequester: ServiceOrder[];

    @OneToMany(() => ServiceOrderMessage, serviceOrderMessage => serviceOrderMessage.userReceiver)
    @JoinColumn({name: 'id', referencedColumnName: 'receiver_id'})
    serviceOrderMessage: ServiceOrderMessage[];

    @OneToMany(() => ServiceOrderMessage, serviceOrderMessages => serviceOrderMessages.userSender)
    @JoinColumn({name: 'id', referencedColumnName: 'sender_id'})
    serviceOrderMessages: ServiceOrderMessage[];

    @OneToMany(() => TaskMessage, taskMessages => taskMessages.userSender)
    @JoinColumn({name: 'id', referencedColumnName: 'sender_id'})
    taskMessage: TaskMessage[];

    @OneToMany(() => TaskMessage, taskMessage => taskMessage.userReceiver)
    @JoinColumn({name: 'id', referencedColumnName: 'receiver_id'})
    taskMessages: TaskMessage[];

    @OneToMany(() => SubTask, sub_task => sub_task.responsible)
    @JoinColumn({name: 'id', referencedColumnName: 'responsible_id'})
    sub_tasks: SubTask[];

    @OneToMany(() => InventoryMovementHistory, inventoryMovementHistory => inventoryMovementHistory.user)
    @JoinColumn({name: 'id', referencedColumnName: 'responsible_id'})
    inventoryMovementHistory: InventoryMovementHistory[];

    @OneToMany(() => Inspection, inspection => inspection.responsible)
    @JoinColumn({name: 'id', referencedColumnName: 'responsible_id'})
    inspections: Inspection[];

    @OneToMany(() => Motoboy, motoboy => motoboy.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    motoboy: Motoboy[];

    @OneToMany(() => CreditCardRequest, credit_card_request => credit_card_request.user)
    @JoinColumn({name: 'id', referencedColumnName: 'send_by'})
    credit_card_request: CreditCardRequest[];

    @OneToMany(() => Assembly, assemblies => assemblies.user_send)
    @JoinColumn({name: 'send_by', referencedColumnName: 'id'})
    assemblies: Assembly[];

    @OneToMany(() => Assembly, assemblies_user => assemblies_user.user_consultor)
    @JoinColumn({name: 'id', referencedColumnName: 'assembly_consultor_id'})
    assemblies_user: Assembly[];

    @OneToMany(() => AssemblyRegistrationUpdate, assembly_registration_update => assembly_registration_update.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    assembly_registration_update: AssemblyRegistrationUpdate[];

    @OneToMany(() => AssemblyRegistrationUpdate, assembly_registration_update_sender => assembly_registration_update_sender.sender)
    @JoinColumn({name: 'id', referencedColumnName: 'send_id'})
    assembly_registration_update_sender: AssemblyRegistrationUpdate[];*/

   /* @OneToMany(() => UserPermission, user_permissions => user_permissions.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    user_permissions: UserPermission[];*/

    @OneToMany(() => Enterprise, enterprise => enterprise.user)
    @JoinColumn({name: 'enterprise_id', referencedColumnName: 'id'})
    enterprise: Enterprise[];
}
