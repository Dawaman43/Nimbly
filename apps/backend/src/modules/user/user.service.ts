import { Injectable } from '@nestjs/common';
import { User } from '@nimbly/shared-types';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
