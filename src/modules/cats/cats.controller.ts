import { Controller, Get, Param } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService){};

  @Get()
  findAll(): string {
    return 'This return all cats';
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `This action return a #${params.id}`
  }
}
