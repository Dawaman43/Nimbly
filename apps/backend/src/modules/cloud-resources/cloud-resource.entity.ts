import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CloudResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne('User')
  @JoinColumn({ name: 'userId' })
  user: any;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['EC2', 'S3', 'RDS', 'Lambda'],
  })
  type: 'EC2' | 'S3' | 'RDS' | 'Lambda';

  @Column({
    type: 'enum',
    enum: ['running', 'stopped', 'terminated', 'error'],
    default: 'running',
  })
  status: 'running' | 'stopped' | 'terminated' | 'error';

  @Column('float')
  cpu: number;

  @Column('float')
  ram: number;

  @Column('float')
  storage: number;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  ip?: string;

  @CreateDateColumn()
  createdAt: Date;
}
