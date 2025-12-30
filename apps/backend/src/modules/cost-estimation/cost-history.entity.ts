import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['resourceId', 'timestamp'])
@Index(['userId', 'timestamp'])
export class CostHistory {
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

  @Column('decimal', { precision: 10, scale: 4 })
  hourlyCost: number;

  @Column('decimal', { precision: 10, scale: 4 })
  dailyCost: number;

  @Column('decimal', { precision: 10, scale: 4 })
  monthlyCost: number;

  @Column('float')
  cpuUtilization: number;

  @Column('float')
  memoryUtilization: number;

  @Column('float')
  storageUtilization: number;

  @Column('float')
  networkIn: number;

  @Column('float')
  networkOut: number;

  @Column('int')
  activeConnections: number;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  timestamp: Date;
}
