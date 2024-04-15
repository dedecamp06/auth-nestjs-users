import { ExpenseModel } from '../models';

export interface IExpenseRepository {
  createExpense(expense: ExpenseModel): Promise<ExpenseModel>;

  findExpenseById(id: any): Promise<ExpenseModel | undefined>;

  findAllExpense(): Promise<ExpenseModel[]>;

  updateExpense(expense: ExpenseModel): Promise<ExpenseModel>;

  deleteExpense(id: number): Promise<void>;
}
