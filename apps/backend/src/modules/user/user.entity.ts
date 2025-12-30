import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'guest'],
    default: 'user',
  })
  role: 'admin' | 'user' | 'guest';
}
