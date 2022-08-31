import {  BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import ApiFeatures from '../utils/apiFeatures.utils'
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService{
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ){}

    // get all restaurants => GET /restaurants
       async findAll(query: Query) : Promise<Restaurant[]>{

        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage -1)

          const keyword = query.keyword ? {
            name: {
              $regex: query.keyword,
              $options: 'i'
            }
          }: {}

            const restaurants = await this.restaurantModel.find({...keyword}).limit(resPerPage).skip(skip)
            return restaurants
       }

    // create new restaurant => POST /restaurants
       async create(restaurant: Restaurant) : Promise<Restaurant>{

            const location =  await ApiFeatures.getRestaurantLocation(restaurant.address)
            const data = Object.assign(restaurant, {location})

            const res = await this.restaurantModel.create(data)
            return res
       }

    // get a restaurant by id => GET /restaurants/:id
       async findById(id:string) : Promise<Restaurant>{

        const isValidId = mongoose.isValidObjectId(id)
        if(!isValidId){
          throw new BadRequestException('Wrong mongoose Id error. Please enter correct Id.')
        }
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
