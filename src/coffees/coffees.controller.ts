import {
  Body,
  Controller,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    // return `This action returns all coffees. Limit ${limit}, ${offset}`;
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // only int ?? example
    // return `This action returns #${id} coffee`;
    return this.coffeeService.findOne(id);
  }

  @Post(':id')
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    // return `This action creates a coffee`;
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`;
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeeService.remove(id);
  }
}
