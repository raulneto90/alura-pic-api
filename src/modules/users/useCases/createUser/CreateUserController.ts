import { HttpExceptionDTO } from '@errors/HttpExceptionDTO';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserDTO } from '../../dtos/UserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

@Controller('users')
@ApiTags('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error data validation',
    type: HttpExceptionDTO,
  })
  async handle(@Body() data: CreateUserDTO): Promise<UserDTO> {
    return this.createUserUseCase.execute(data);
  }
}
