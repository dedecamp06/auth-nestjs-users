import { BadGatewayException, Injectable } from '@nestjs/common';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ExpenseModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';

@Injectable()
export class FindExpensesApplication implements ApplicationInterface {
  constructor(private readonly repository: ExpenseRepository) {}

  async run() {
    try {
      const find: ExpenseModel[] = await this.repository.findAllExpense();
      return find;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
