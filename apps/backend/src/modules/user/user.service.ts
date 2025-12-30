import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.userRepository.count();
    if (count === 0) {
      // Seed data
      const seedUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Demo User',
        email: 'demo@nimbly.com',
        username: 'demouser',
        password: '$2b$10$dummyhashedpassword', // dummy hash
        role: 'admin' as const,
      };
      await this.userRepository.save(seedUser);
    }
  }

  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return !user;
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }

  async searchUsernames(query: string, limit: number = 10): Promise<string[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select('user.username')
      .where('user.username LIKE :query', { query: `${query}%` })
      .andWhere('user.username IS NOT NULL')
      .limit(limit)
      .getRawMany();

    return users.map(user => user.user_username);
  }
