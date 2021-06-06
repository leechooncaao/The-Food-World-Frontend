import { Component, OnInit} from '@angular/core';
import { TotalQuantity } from 'src/app/models/TotalQuantity';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  totalQuantity = new TotalQuantity();

  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getTotalQuantity();

    this.totalQuantity = this.cartService.totalQuantity;

  }

}
