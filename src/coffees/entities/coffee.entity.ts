import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(type => Flavor, flavor => flavor.coffees, {
    cascade: true, // ['insert']
  })
  flavors: Flavor[];
}
