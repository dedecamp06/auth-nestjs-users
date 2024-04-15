import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateUserApplication,
  DeleteOneUserApplication,
  FindOneUserApplication,
  FindUsersApplication,
  UpdateUserApplication,
} from 'src/application';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserApplication: CreateUserApplication,
    private readonly findUsersApplication: FindUsersApplication,
    private readonly findOneUserApplication: FindOneUserApplication,
    private readonly updateUserApplication: UpdateUserApplication,
    private readonly deleteOneUserApplication: DeleteOneUserApplication,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserApplication.run(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'All users returned.',
    type: [CreateUserDto],
  })
  async findAll() {
    return await this.findUsersApplication.run();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User returned.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The user ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.findOneUserApplication.run(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The user ID',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserApplication.run({ id: +id, ...updateUserDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The user ID',
  })
  async remove(@Param('id') id: string) {
    return await this.deleteOneUserApplication.run(+id);
  }
}
