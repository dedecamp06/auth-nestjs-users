import { BadGatewayException, Injectable } from '@nestjs/common';
import { ApplicationInterface } from 'src/core/interface';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';

@Injectable()
export class DeleteOneUserApplication implements ApplicationInterface {
  constructor(private readonly repository: UserRepository) {}

  async run(id: number) {
    try {
      const find = await this.repository.deleteUser(id);
      return find;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
