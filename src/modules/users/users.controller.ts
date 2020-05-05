import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('cats')
export class UsersController {
  constructor(private catsService: UsersService){};

  @Get()
  findAll(): string {
    return 'This return all cats';
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `This action return a #${params.id}`
  }
}
