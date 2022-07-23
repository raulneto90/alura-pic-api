import { Module } from '@nestjs/common';

import { UsersRepository } from './repositories/implementations/UsersRepository';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';

@Module({
  controllers: [CreateUserController],
  providers: [UsersRepository, CreateUserUseCase],
})
export class UsersModule {}
