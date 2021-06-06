import { Food } from "./Food";

export class FoodCart {
    food: Food;
    foodQuantity: number;
    orderId: number;

    constructor(food: Food, foodQuantity: number){
        this.food = food;
        this.foodQuantity = foodQuantity;
    }
}