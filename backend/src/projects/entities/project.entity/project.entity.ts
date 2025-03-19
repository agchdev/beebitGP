import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn() // Esta es la llave primaria
    id:number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'text', nullable:true})
    description: string;

    @Column({type:'varchar', length:500, nullable: true})
    imagen_url: string;

    @Column({type:'timestamp'})
    start_date: Date;

    @Column({type:'timestamp', nullable:true})
    end_date: Date;

    @Column({type:'varchar', length:50})
    status: string;
}
