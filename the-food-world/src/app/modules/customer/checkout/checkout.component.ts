import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodCart } from 'src/app/models/FoodCart';
import { CartService } from 'src/app/services/cart.service';
import { Account } from 'src/app/models/Account';
import { OrderService } from 'src/app/services/order.service';
import { OrderDTO } from 'src/app/models/OrderDTO';

declare var paypal;
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total: number;
  totalInUSD: string;
  listFoods: FoodCart[];
  orderForm: FormGroup;
  account : Account = {
    accountId: 1,
    accountName: "leechoncaao",
    accountPassword: "$2y$12$O5l4LNddjCsTKD/EcsEmx.j9bLJKYIxzlJ5tj64QMJx26K6ZXrqX.",
    accountEmail: "lephuocthanhcao@gmail.com",
    accountStatus: 0,
    accountRegisterTime: "2021-05-16T00:39:00.000+00:00",
    accountLoginTime: "2021-05-16T01:39:00.000+00:00",
    customer: {
        customerId: 1,
        customerName: "Lê Phước Thanh Cao",
        customerPhone: "0777542581",
        customerBirthday: "1996-12-12T17:00:00.000+00:00",
        customerAvatar: "https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-v%E1%BA%BD-m%C3%A8o-cute.jpg",
        customerAddress: "41b Mai Lão Bạng"
    }
  }
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  messagePayment: string;
  loading = false;

  constructor(private cartService: CartService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.total = this.cartService.getToTal();
    this.totalInUSD = (this.total / 22000).toFixed(2);
    this.listFoods = this.cartService.getListOrderingFoods();

    this.orderForm = new FormGroup({
      account: new FormControl(this.account),
      total: new FormControl(this.total),
      deliveryAddress: new FormControl(null, Validators.required),
      methodPayment: new FormControl('0')
    });
    this.onPay();
  }

  submitOrderForm(){
    const newOrder = new OrderDTO(this.orderForm.value, this.listFoods)

    this.orderService.createNewOrder(newOrder).subscribe(data => {
      console.log('created order !');
      this.messagePayment = null;
      this.cartService.resetCart();
      $('#before-checkout').hide();
      $('#after-checkout').show();
    })
  }

  onPay() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalInUSD
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        this.loading = true;
        // This function captures the funds from the transaction.
        return actions.order.capture().then((details) => {
          // This function shows a transaction success message to your buyer.
          this.messagePayment = 'Thanh toán thành công !';
          this.loading = false;
        });
      }
    }).render(this.paypalElement.nativeElement);
  }

  hidePaypalButton(){
    $('#paypal-button').hide();
  }

  showPaypalButton(){
    $('#paypal-button').show();
  }

}
