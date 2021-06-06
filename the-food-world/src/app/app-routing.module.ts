import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './modules/customer/cart/cart.component';
import { CheckoutComponent } from './modules/customer/checkout/checkout.component';
import { DetailFoodComponent } from './modules/customer/detail-food/detail-food.component';
import { HomepageComponent } from './modules/customer/homepage/homepage.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'detail/:foodId', component: DetailFoodComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
