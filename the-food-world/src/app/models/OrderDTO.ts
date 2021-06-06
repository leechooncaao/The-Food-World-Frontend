import { FoodCart } from "./FoodCart";
import { Order } from "./Order";

export class OrderDTO {
    order: Order;
    listFoodCarts: FoodCart[];

    constructor(order, listFoodCarts){
        this.order = order;
        this.listFoodCarts = listFoodCarts;
    }
}