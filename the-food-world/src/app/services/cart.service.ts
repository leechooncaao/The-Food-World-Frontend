import { Injectable } from '@angular/core';
import { Food } from '../models/Food';
import { FoodCart } from '../models/FoodCart';
import { TotalQuantity } from '../models/TotalQuantity';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private listOrderingFoods :FoodCart[] = new Array();
  private isContained = false;

  public totalQuantity = new TotalQuantity();

  constructor() { }

  public getListOrderingFoods(): FoodCart[] {
    return this.listOrderingFoods;
  };

  public addNewFoodToCart(newFood : Food) {
    if(this.listOrderingFoods.length === 0){
      this.isContained = false;
    }

    for(let foodCart of this.listOrderingFoods){
      if(newFood.foodId === foodCart.food.foodId){
        this.isContained = true;
        foodCart.foodQuantity++;
        break;
      }else{
        this.isContained = false;
      }
    }

    if(!this.isContained){
      this.listOrderingFoods.push(new FoodCart(newFood, 1))
    }

    this.getTotalQuantity();
  }

  public removeFoodCart(foodId: number){
    this.listOrderingFoods = this.listOrderingFoods.filter(foodCart => foodCart.food.foodId !== foodId);
    this.getTotalQuantity();
  }

  public getTotalQuantity(){
    if(this.listOrderingFoods.length === 0){
      this.totalQuantity.quantity = 0;
    }

    let totalQuantity = 0;
    for(let foodCart of this.listOrderingFoods){
      totalQuantity += foodCart.foodQuantity;
    }

    this.totalQuantity.quantity = totalQuantity;

  }

  public getToTal(){
    if(this.listOrderingFoods.length === 0){
      return 0;
    }

    let total = 0;
    for(let foodCart of this.listOrderingFoods){
      total += (foodCart.foodQuantity * foodCart.food.foodPrice);
    }

    return total;
  }

  public resetCart(){
    this.listOrderingFoods.length = 0;
    this.getTotalQuantity();
  }
}
