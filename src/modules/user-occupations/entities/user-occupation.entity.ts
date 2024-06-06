import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user_occupations')
export class UserOccupation
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    color: string;

    @Column()
    sort_order: number;

    @Column()
    sindico_view: number;

/*    @OneToOne(() => User, user => user.occupation)
    @JoinColumn({name: 'id', referencedColumnName: 'occupation_id'})
    user: User;

    @OneToOne(() => SurveyParticipant, surveyParticipant => surveyParticipant.occupation)
    @JoinColumn({name: 'id', referencedColumnName: 'user_occupation_id'})
    participant: SurveyParticipant;

    @OneToOne(() => CondominiumUser)
    @JoinColumn({name: 'id', referencedColumnName: 'occupation_id'})
    condominiumUser: CondominiumUser;

    @OneToMany(() => AssemblyRegistrationUpdate, assembly_registration_update => assembly_registration_update.user_occupation)
    @JoinColumn({name: 'id', referencedColumnName: 'user_occupation_id'})
    assembly_registration_update: AssemblyRegistrationUpdate[];*/
}
