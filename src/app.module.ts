import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    // secure in future
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres' as const,
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: false,
          }
        : {
            type: 'postgres' as const, // type of our database
            host: process.env.DATABASE_HOST, // database host
            port: +process.env.DATABASE_PORT, // database port
            username: process.env.DATABASE_USERNAME, // username
            password: process.env.DATABASE_PASSWORD, // user password
            database: process.env.DATABASE_NAME, // name of our database,
            autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
            synchronize: false, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
          },
    ),
    DatabaseModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
