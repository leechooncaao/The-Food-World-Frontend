import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCart } from 'src/app/models/FoodCart';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listFoods: FoodCart[];
  total : number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getListFoods();
  }

  getListFoods(){
    this.listFoods = this.cartService.getListOrderingFoods();
    this.getTotal();
  }

  removeFoodCart(foodId: number){
    this.cartService.removeFoodCart(foodId);
    this.getListFoods();
  }

  increaseItem(index:number){
    let foodQuantity = $('#food'+index).val();
    if($.isNumeric(foodQuantity)){
      this.cartService.getListOrderingFoods()[index].foodQuantity++;
      this.getListFoods();
    };

    this.cartService.getTotalQuantity();
  }

  decreaseItem(index: number){
    let foodQuantity = $('#food'+index).val();
    if($.isNumeric(foodQuantity) && foodQuantity > 1){
      this.cartService.getListOrderingFoods()[index].foodQuantity--;
      this.getListFoods();
    };

    this.cartService.getTotalQuantity();
  }

  getTotal(){
    this.total = this.cartService.getToTal();
  }

}
