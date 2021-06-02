import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailFoodComponent } from './modules/customer/detail-food/detail-food.component';
import { HomepageComponent } from './modules/customer/homepage/homepage.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'detail/:foodId', component: DetailFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
