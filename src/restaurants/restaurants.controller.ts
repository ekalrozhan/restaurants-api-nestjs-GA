import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { createRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) {}

    @Get()
    async getAllRestaurants() : Promise<Restaurant[]> {
        return this.restaurantsService.findAll()
    }

    @Post()
    async createRestaurant(@Body() restaurant: createRestaurantDto) : Promise<Restaurant>{
        return this.restaurantsService.create(restaurant)
    }

    @Get(':id')
    async getRestaurant(@Param('id') id :string) : Promise<Restaurant> {
        return this.restaurantsService.findById(id)
    }

    @Put(':id')
    async updateRestaurant(@Param('id') id: string, @Body() restaurant : UpdateRestaurantDto ) :Promise<Restaurant>{
        await this.restaurantsService.findById(id)
        return this.restaurantsService.updateById(id, restaurant)
    }
}
