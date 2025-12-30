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
        password: '$2b$10$dummyhashedpassword', // dummy hash
        role: 'admin' as const,
      };
      await this.userRepository.save(seedUser);
    }
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
