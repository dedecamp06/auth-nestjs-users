import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';

@Injectable()
export class FindUsersApplication implements ApplicationInterface {
  constructor(private readonly repository: UserRepository) {}

  async run() {
    try {
      const find: UserModel[] = await this.repository.findAllUser();
      return find;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
