import {
  Body,
  Controller,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @UsePipes(ValidationPipe)
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    // return `This action returns all coffees. Limit ${limit}, ${offset}`;
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    // only int ?? example
    // return `This action returns #${id} coffee`;
    return this.coffeeService.findOne('' + id); // id.toString()
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    // return `This action creates a coffee`;
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    // return `This action updates #${id} coffee`;
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeeService.remove(id);
  }
}
