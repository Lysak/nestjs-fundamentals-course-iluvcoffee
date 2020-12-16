import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  //nest g class coffees/dto/create-coffee.dto --no-spec
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
