import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne('User')
  @JoinColumn({ name: 'userId' })
  user: any;

  @Column()
  resourceId: string;

  @ManyToOne('CloudResource')
  @JoinColumn({ name: 'resourceId' })
  resource: any;

  @Column({
    type: 'enum',
    enum: ['CPU', 'RAM', 'Storage', 'Network'],
  })
  type: 'CPU' | 'RAM' | 'Storage' | 'Network';

  @Column('float')
  threshold: number;

  @CreateDateColumn({ nullable: true })
  triggeredAt?: Date;
}
