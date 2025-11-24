import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { MenuService } from '../menu-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-cart',
  imports: [FormsModule,CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  menuItems:any=[];
  items:any=[];
constructor(private _menuService: MenuService,private _cart :CartService) {}

  ngOnInit() {
    this.menuItems = this._cart.getCart();
     let haveItems:Boolean=false;
      if(this.menuItems.length>1)
        haveItems=true;
  }
  addToCart(item:Item)
  {
    this._cart.addItem(item);
  }
}
