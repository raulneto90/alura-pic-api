import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: CreateUserDTO): User;
  findByName(name: string): User;
}
