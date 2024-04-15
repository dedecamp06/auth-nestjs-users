import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import {
  FindExpensesApplication,
  CreateExpensesApplication,
  UpdateExpensesApplication,
  FindOneExpensesApplication,
  DeleteExpensesApplication,
} from '../../application';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly createExpensesApplication: CreateExpensesApplication,
    private readonly findExpensesApplication: FindExpensesApplication,
    private readonly updateExpensesApplication: UpdateExpensesApplication,
    private readonly findOneExpensesApplication: FindOneExpensesApplication,
    private readonly deleteExpensesApplication: DeleteExpensesApplication,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() req: Request,
  ) {
    return await this.createExpensesApplication.run(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'All expenses retrieved successfully.',
    type: [CreateExpenseDto],
  })
  async findAll() {
    return await this.findExpensesApplication.run();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Expense retrieved successfully.',
    type: CreateExpenseDto,
  })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The expense ID',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return await this.findOneExpensesApplication.run(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({ status: 200, description: 'Expense updated successfully.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The expense ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() req: Request,
  ) {
    return await this.updateExpensesApplication.run(
      {
        id: +id,
        ...updateExpenseDto,
      },
      req.user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The expense ID',
  })
  async remove(@Param('id') id: string, @Req() req: Request) {
    return await this.deleteExpensesApplication.run(+id, req.user);
  }
}
