import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ExpenseModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';

@Injectable()
export class UpdateExpensesApplication implements ApplicationInterface {
  constructor(private readonly repository: ExpenseRepository) {}

  async run(params: ExpenseModel, request) {
    try {
      if (!params) throw new BadRequestException('Body not found!');

      const findExpenses = await this.repository.findExpenseById(params.id);

      if (request.email !== findExpenses.userId['email']) {
        throw new UnauthorizedException('User without update authorization');
      }

      const result: ExpenseModel = await this.repository.updateExpense(params);
      return result;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
