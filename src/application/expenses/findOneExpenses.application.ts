import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ExpenseModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';

@Injectable()
export class FindOneExpensesApplication implements ApplicationInterface {
  constructor(private readonly repository: ExpenseRepository) {}

  async run(id: number, request) {
    try {
      const findExpenses = await this.repository.findExpenseById(id);

      if (request.email !== findExpenses.userId['email']) {
        throw new UnauthorizedException('User without update authorization');
      }
      const find: ExpenseModel = await this.repository.findExpenseById(id);
      return find;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
