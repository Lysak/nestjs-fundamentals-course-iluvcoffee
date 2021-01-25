import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import * as request from 'supertest';

// sudo npm run test:e2e -- coffee.e2e-spec

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    title: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres', // type of our database
          host: 'localhost', // database host
          port: 5433, // database port
          username: 'postgres', // username
          password: 'pass123', // user password
          database: 'postgres', // name of our database,
          autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
          synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  // can use todo to track tests that need to be implemented
  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = jasmine.objectContaining({
          ...coffee,
          flavors: jasmine.arrayContaining(
            coffee.flavors.map(name => jasmine.objectContaining({ name })),
          ),
        });

        expect(body).toEqual(expectedCoffee);
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.OK);
  });

  // it('Get one [GET /:id]', () => {
  //   return request(app.getHttpServer())
  //     .get('/coffees/1')
  //     .expect(HttpStatus.OK)
  //     .then(({ body }) => {
  //       const expectedCoffee = jasmine.objectContaining({
  //         ...coffee,
  //         flavors: jasmine.arrayContaining(
  //           coffee.flavors.map(name => jasmine.objectContaining({ name })),
  //         ),
  //       });
  //
  //       expect(body).toEqual(expectedCoffee);
  //     });
  // });

  // it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
