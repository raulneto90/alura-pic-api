import { randomUUID } from 'crypto';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { User } from '@modules/users/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(data: CreateUserDTO): User {
    const user: User = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  findByName(name: string): User {
    return this.users.find((user) => user.username === name);
  }
}
