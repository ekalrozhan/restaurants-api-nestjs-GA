import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService{
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ){}

    // get all restaurants => GET /restaurants
       async findAll() : Promise<Restaurant[]>{
            const restaurants = await this.restaurantModel.find()
            return restaurants
       }

    // create new restaurant => POST /restaurants
       async create(restaurant: Restaurant) : Promise<Restaurant>{
            const res = await this.restaurantModel.create(restaurant)
            return res
       }

    // get a restaurant by id => GET /restaurants/:id
       async findById(id:string) : Promise<Restaurant>{
        const restaurant = await this.restaurantModel.findById(id)

        if(!restaurant){
            throw new NotFoundException('Restaurant not found.')
        }
        return restaurant
       }

    //    update a restaurant by Id => PUT /restaurant/:id
      async updateById(id:string, restaurant: Restaurant) : Promise<Restaurant>{
        return this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true
        })
      }

}
