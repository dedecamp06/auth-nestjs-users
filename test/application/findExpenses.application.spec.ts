import { Test, TestingModule } from '@nestjs/testing';

import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { ExpenseModel } from 'src/core';
import { BadGatewayException } from '@nestjs/common';
import { FindExpensesApplication } from 'src/application';

describe('FindExpensesApplication', () => {
  let service: FindExpensesApplication;
  let mockExpenseRepository: jest.Mocked<ExpenseRepository>;

  beforeEach(async () => {
    mockExpenseRepository = {
      findAllExpense: jest.fn().mockResolvedValue([]),
    } as unknown as jest.Mocked<ExpenseRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindExpensesApplication,
        {
          provide: ExpenseRepository,
          useValue: mockExpenseRepository,
        },
      ],
    }).compile();

    service = module.get<FindExpensesApplication>(FindExpensesApplication);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve all expenses successfully', async () => {
    const expenses: ExpenseModel[] = [
      {
        id: 1,
        description: 'Dinner',
        date: '2022-04-21',
        value: 100,
        userId: 2,
      },
    ];
    mockExpenseRepository.findAllExpense.mockResolvedValue(expenses);

    const result = await service.run();
    expect(result).toEqual(expenses);
    expect(mockExpenseRepository.findAllExpense).toHaveBeenCalled();
  });

  it('should throw a BadGatewayException when an error occurs', async () => {
    const error = new Error('Database error');
    mockExpenseRepository.findAllExpense.mockRejectedValue(error);

    await expect(service.run()).rejects.toThrow(BadGatewayException);
    expect(mockExpenseRepository.findAllExpense).toHaveBeenCalled();
  });
});
