import { Module } from '@nestjs/common';
import { ExpensesModule } from './main/expenses/expenses.module';
import { UsersModule } from './main/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configDB from './infrastructure/orm/config/db.config';
import { AuthModule } from './main/auth/auth.module';
import { EmailModule } from './main/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configDB),
    ExpensesModule,
    UsersModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
