import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ApplicationInterface } from 'src/core/interface';

@Injectable()
export class DeleteExpensesApplication implements ApplicationInterface {
  constructor(private readonly repository: ExpenseRepository) {}

  async run(id: number, request) {
    try {
      const findExpenses = await this.repository.findExpenseById(id);

      if (request.email !== findExpenses.userId['email']) {
        throw new UnauthorizedException('User without update authorization');
      }
      const result = await this.repository.deleteExpense(id);
      return result;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
