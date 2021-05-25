import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomepageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, FooterComponent, HomepageComponent]
})
export class CustomerModule { }
