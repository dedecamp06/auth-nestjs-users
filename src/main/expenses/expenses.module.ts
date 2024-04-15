import { Module, forwardRef } from '@nestjs/common';
import {
  FindExpensesApplication,
  CreateExpensesApplication,
  UpdateExpensesApplication,
  FindOneExpensesApplication,
  DeleteExpensesApplication,
} from '../../application';
import { ExpensesController } from './expenses.controller';
import { Expense } from 'src/infrastructure/orm/entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { EmailModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), 
  forwardRef(() => EmailModule),
  forwardRef(() => UsersModule)
],
  controllers: [ExpensesController],
  providers: [
    FindExpensesApplication,
    CreateExpensesApplication,
    UpdateExpensesApplication,
    FindOneExpensesApplication,
    DeleteExpensesApplication,
    ExpenseRepository,
  ],
})
export class ExpensesModule {}
