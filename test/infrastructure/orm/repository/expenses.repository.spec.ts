import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseModel } from 'src/core';
import { ExpenseRepository } from 'src/infrastructure/orm/repository/expense.repository';
import { Expense } from 'src/infrastructure/orm/entities/expense.entity';

describe('ExpenseRepository', () => {
  let repository: ExpenseRepository;
  let mockExpenseRepository: Partial<
    Record<keyof Repository<ExpenseModel>, jest.Mock>
  >;

  beforeEach(async () => {
    mockExpenseRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseRepository,
        {
          provide: getRepositoryToken(Expense),
          useValue: mockExpenseRepository,
        },
      ],
    }).compile();

    repository = module.get<ExpenseRepository>(ExpenseRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create an expense', async () => {
    const expenseData = {
      id: 1,
      description: 'UPDATE',
      date: '2024-02-02',
      value: 300,
    };
    mockExpenseRepository.save.mockResolvedValue(expenseData);

    expect(await repository.createExpense(expenseData)).toEqual(expenseData);
    expect(mockExpenseRepository.save).toHaveBeenCalledWith(expenseData);
  });

  it('should find an expense by id', async () => {
    const expenseData = { id: 1, name: 'Dinner', amount: 50 };
    mockExpenseRepository.findOne.mockResolvedValue(expenseData);

    expect(await repository.findExpenseById(1)).toEqual(expenseData);
    expect(mockExpenseRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['userId'],
    });
  });

  it('should list all expenses', async () => {
    const expenses = [{ id: 1, name: 'Dinner', amount: 50 }];
    mockExpenseRepository.find.mockResolvedValue(expenses);

    expect(await repository.findAllExpense()).toEqual(expenses);
    expect(mockExpenseRepository.find).toHaveBeenCalledWith({
      relations: ['userId'],
    });
  });

  it('should update an expense', async () => {
    const expenseData = {
      id: 1,
      description: 'UPDATE',
      date: '2024-02-02',
      value: 300,
    };
    mockExpenseRepository.save.mockResolvedValue(expenseData);

    expect(await repository.updateExpense(expenseData)).toEqual(expenseData);
    expect(mockExpenseRepository.save).toHaveBeenCalledWith(expenseData);
  });

  it('should delete an expense', async () => {
    const expenseId = 1;
    mockExpenseRepository.delete.mockResolvedValue(undefined);

    await repository.deleteExpense(expenseId);
    expect(mockExpenseRepository.delete).toHaveBeenCalledWith(expenseId);
  });
});
