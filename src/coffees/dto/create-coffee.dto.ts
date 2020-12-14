export class CreateCoffeeDto {
  //nest g class coffees/dto/create-coffee.dto --no-spec
  readonly name: string;
  readonly brand: string;
  readonly flavour: string[];
}
