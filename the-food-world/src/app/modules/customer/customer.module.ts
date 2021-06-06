import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailFoodComponent } from './detail-food/detail-food.component';
import { RouterModule } from '@angular/router';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxLoadingModule } from 'ngx-loading';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomepageComponent, DetailFoodComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule,
    NgxStarRatingModule ,
    NgxLoadingModule
  ],
  exports: [HeaderComponent, FooterComponent, HomepageComponent, DetailFoodComponent, CartComponent, CheckoutComponent]
})
export class CustomerModule { }
