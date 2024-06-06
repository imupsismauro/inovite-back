import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Condominium} from "./condominium.entity";

@Entity('condominium_segmentations')
export class CondominiumSegmentations {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: false})
    name?: string;

/*    @OneToMany(() => Condominium, condominium => condominium.condominium_segmentations)
    @JoinColumn({name: 'id', referencedColumnName: 'segmentation_id'})
    condominium: Condominium[];*/
}
