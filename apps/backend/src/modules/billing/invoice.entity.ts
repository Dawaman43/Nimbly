import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    date: string; // ISO date string

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    status: 'Paid' | 'Pending' | 'Overdue';

    @Column({ nullable: true })
    pdfUrl?: string;

    @CreateDateColumn()
    createdAt: Date;
}
