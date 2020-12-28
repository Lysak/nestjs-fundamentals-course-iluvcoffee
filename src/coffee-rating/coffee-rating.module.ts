import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'pass123',
      port: 5432,

      // tmp fix in future

      // type: 'postgres' as const, // type of our database
      // host: process.env.DATABASE_HOST, // database host
      // username: process.env.DATABASE_USERNAME, // username
      // password: process.env.DATABASE_PASSWORD, // user password
      // port: +process.env.DATABASE_PORT, // database port
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
