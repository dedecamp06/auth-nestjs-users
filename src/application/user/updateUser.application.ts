import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';

@Injectable()
export class UpdateUserApplication implements ApplicationInterface {
  constructor(private readonly repository: UserRepository) {}

  async run(params: UserModel) {
    try {
      if (!params) throw new BadRequestException('Body not found!');
      const find: UserModel = await this.repository.updateUser(params);
      return find;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
