import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional } from "class-validator"
import { Category } from "../schemas/restaurant.schema"

export class UpdateRestaurantDto{
   
    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly description: string

    @IsEmail({}, {message: 'Please enter correct email address'})
    @IsOptional()
    readonly email: string

    @IsPhoneNumber('MY')
    @IsOptional()
    readonly phoneNo: Number

    @IsString()
    @IsOptional()
    readonly address: string

    @IsEnum(Category, {message: 'Please enter correct category'})
    @IsOptional()
    readonly category: Category
}