import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class MonitoringLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // e.g., 'error', 'info', 'warning'
    level: string;

    @Column()
    message: string;

    @Column({ nullable: true })
    source?: string;

    @CreateDateColumn()
    timestamp: Date;
}
