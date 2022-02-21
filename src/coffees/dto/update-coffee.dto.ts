import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// PartialType extends all types from the input, and makes them all optional as well. All validation is extended with an additional @IsOptional() decorator added.
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
