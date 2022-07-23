import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { UserDTO } from '../../dtos/UserDTO';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserDTO> {
    const user = this.usersRepository.create(data);

    return user;
  }
}
