export class UpdateCoffeeDto {
  //nest g class coffees/dto/update-coffee.dto --no-spec
  readonly name?: string;
  readonly brand?: string;
  readonly flavour?: string[];
}
