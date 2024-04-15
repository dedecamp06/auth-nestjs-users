import { Repository } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { IExpenseRepository } from 'src/core/interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseModel } from 'src/core';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<ExpenseModel>,
  ) {}

  async createExpense(expense: ExpenseModel): Promise<ExpenseModel> {
    return await this.expenseRepo.save(expense);
  }

  async findExpenseById(id: number): Promise<ExpenseModel | undefined> {
    return await this.expenseRepo.findOne({
      where: { id },
      relations: ['userId'],
    });
  }

  async findAllExpense(): Promise<ExpenseModel[]> {
    return await this.expenseRepo.find({ relations: ['userId'] });
  }

  async updateExpense(expense: ExpenseModel): Promise<ExpenseModel> {
    return await this.expenseRepo.save(expense);
  }

  async deleteExpense(id: number): Promise<void> {
    await this.expenseRepo.delete(id);
  }
}
