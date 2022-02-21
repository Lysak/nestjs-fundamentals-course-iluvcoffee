import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<any> {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    
    return coffee;
  }

  create(createCoffeeDTO: CreateCoffeeDto): Promise<Coffee> {
    const coffee = new this.coffeeModel(createCoffeeDTO);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDTO: UpdateCoffeeDto): Promise<Coffee> {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateCoffeeDTO },
        {
          new: true,
          useFindAndModify: false,
        }
      )
      .exec();
    
      if (!existingCoffee) {
        throw new NotFoundException(`Coffee #${id} not found`);
    }

    return existingCoffee;
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  async recommendCoffee(coffee: Coffee): Promise<void> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });

      await recommendEvent.save({ session });
      await coffee.save({ session });


      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
