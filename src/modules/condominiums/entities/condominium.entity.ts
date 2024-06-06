import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('condominiums')
export class Condominium
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    code: number;

    @Column()
    name: string;

    @Column()
    segmentation_id: number;

    @Column()
    thumbnail: string;

    @Column()
    active: number;

    @Column()
    document: string;

    @Column()
    ads_postcode: string;

    @Column()
    ads_address1: string;

    @Column()
    ads_address2: string;

    @Column()
    ads_neighborhood: string;

    @Column()
    ads_complement: string;

    @Column()
    ads_city: string;

    @Column()
    ads_state: string;

    @Column()
    is_filial: number;

    @Column()
    has_garantiza: number;

    @Column()
    is_cipa_sindica: number;

 /*   @OneToMany(() => Unit, unit => unit.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    units: Unit[];

    @OneToOne(() => CondominiumUser)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    condominiumUser: CondominiumUser;

    @OneToOne(() => ConfigurationManager, configurationManager => configurationManager.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    configuration_manager: ConfigurationManager;

    @OneToMany(() => Task, task => task.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    tasks: Task[];

    @OneToMany(() => Inspection, inspection => inspection.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    inspections: Inspection[];

    @OneToMany(() => Motoboy, motoboy => motoboy.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    motoboy: Motoboy[];

    @OneToMany(() => CreditCard, credit_card => credit_card.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    credit_card: CreditCard[];

    @OneToMany(() => CreditCardRequest, credit_card_request => credit_card_request.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    credit_card_request: CreditCardRequest[];

    @ManyToOne(() => CondominiumSegmentations, condominium_segmentations => condominium_segmentations.condominium)
    @JoinColumn({name: 'segmentation_id', referencedColumnName: 'id'})
    condominium_segmentations: CondominiumSegmentations;

    @OneToMany(() => Assembly, assembly => assembly.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly: Assembly[];

    @OneToMany(() => AssemblyBudgetPrevision, assembly_budget_prevision => assembly_budget_prevision.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_budget_prevision: AssemblyBudgetPrevision[];

    @OneToMany(() => AssemblyBudgetPrevisionBalance, assembly_budget_prevision_balance => assembly_budget_prevision_balance.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_budget_prevision_balance: AssemblyBudgetPrevisionBalance[];

    @OneToMany(() => AssemblyCriticizeReceipt, assembly_criticize_receipt => assembly_criticize_receipt.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_criticize_receipt: AssemblyCriticizeReceipt[];

    @OneToMany(() => AssemblyCondominiumQuota, assembly_condominium_quota => assembly_condominium_quota.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_condominium_quota: AssemblyCondominiumQuota[];

    @OneToMany(() => AssemblyDebtors, assembly_debtors => assembly_debtors.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_debtors: AssemblyDebtors[];

    @OneToMany(() => AssemblySettings, assembly_settings => assembly_settings.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_settings: AssemblySettings[];

    @OneToMany(() => AssemblyPayroll, assembly_payroll => assembly_payroll.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_payroll: AssemblyPayroll[];

    @OneToMany(() => AssemblyRegistrationUpdate, assembly_registration_update => assembly_registration_update.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_registration_update: AssemblyRegistrationUpdate[];

    @OneToMany(() => AssemblyProtocol, assembly_protocol => assembly_protocol.condominium)
    @JoinColumn({name: 'id', referencedColumnName: 'condominium_id'})
    assembly_protocol: AssemblyProtocol[];*/
}
