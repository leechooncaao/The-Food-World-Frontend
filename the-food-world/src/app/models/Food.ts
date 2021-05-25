import { FoodCategory } from "./FoodCategory";

export class Food {
    foodId: number;
    foodName: string;
    foodPrice: number;
    foodStatus: number;
    foodCategory: FoodCategory;
    foodImage: string;
    foodTimePost: Date;
    numberOrder: number;
}