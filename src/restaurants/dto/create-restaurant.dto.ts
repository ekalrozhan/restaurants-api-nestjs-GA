import { Category } from "../schemas/restaurant.schema"

export class createRestaurantDto{
   
    readonly name: string
    readonly description: string
    readonly email: string
    readonly phoneNo: Number
    readonly address: string
    readonly category: Category
}