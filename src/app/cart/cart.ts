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
  menuItems: Observable<any[]> | undefined;
  items:any=[];
constructor(private _menuService: MenuService,private _cart :CartService) {}

  ngOnInit() {

    this.menuItems =  this._cart.getCartItems();
    let haveItems:Boolean=false;
    this.menuItems.subscribe(items=>{
      if(items.length<=0)
        haveItems=false;
    })
  }
  addToCart(item:Item)
  {
    this._cart.addItem(item);
  }
  deleteCart(item:Item)
  {
    this._cart.removeItem(item.id?item.id:'');
  }
  updateQuantity(item:Item,oper:string)
  {
    if(oper=="+")
      item.quantity++;
    else
      item.quantity--;
    this._cart.updateQuantity(item.id?item.id:'',item.quantity)
  }
}
