import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit ${limit}, ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // only int ??
    return `This action returns #${id} coffee`;
  }

  @Post(':id')
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Patch(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
