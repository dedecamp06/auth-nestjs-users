import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ExpenseModel, UserModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';
import { EmailService } from 'src/infrastructure/mail/email.service';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';

@Injectable()
export class CreateExpensesApplication implements ApplicationInterface {
  constructor(
    private readonly repository: ExpenseRepository,
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
  ) {}

  async run(params: ExpenseModel) {
    try {
      if (!params) throw new BadRequestException('Body not found!');

      const index: ExpenseModel = await this.repository.createExpense(params);

      if (index) {
        const findUser: UserModel = await this.userRepository.findUserById(
          params.userId,
        );

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const dataMail = {
          to: findUser.email,
          subject: 'Expense registered!',
          context: `Your expense was created successfully on the date ${formattedDate}`,
        };
        await this.emailService.sendMail(dataMail);
      }

      return index;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
