import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Deployment {
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

  @Column({ nullable: true })
  name?: string;

  @Column()
  version: string;

  @Column({
    type: 'enum',
    enum: ['restart', 'scale-up', 'scale-down', 'update'],
  })
  action: 'restart' | 'scale-up' | 'scale-down' | 'update';

  @Column({
    type: 'enum',
    enum: [
      'pending',
      'in-progress',
      'successful',
      'failed',
      'rolling-back',
      'rolled-back',
    ],
    default: 'pending',
  })
  status:
    | 'pending'
    | 'in-progress'
    | 'successful'
    | 'failed'
    | 'rolling-back'
    | 'rolled-back';

  @Column({ type: 'json', nullable: true })
  previousConfig?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  rollbackConfig?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  transitions?: Array<{
    from: string;
    to: string;
    action: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  timestamp: Date;
}
