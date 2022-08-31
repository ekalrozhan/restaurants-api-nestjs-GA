import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService{
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ){}

    // get all restaurants => GET /restaurants
       async findAll(query: Query) : Promise<Restaurant[]>{

          const keyword = query.keyword ? {
            name: {
              $regex: query.keyword,
              $options: 'i'
            }
          }: {}

            const restaurants = await this.restaurantModel.find({...keyword})
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

      // delete a restaurant by id => DELETE /restaurants.:id
      async deleteById(id: string) : Promise<Restaurant>{
        return await this.restaurantModel.findByIdAndDelete(id)
        
      }

}
