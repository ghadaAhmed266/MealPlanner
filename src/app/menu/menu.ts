import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { MenuService } from '../menu-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';


@Component({
  selector: 'app-menu',
  imports: [FormsModule,CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  menuItems: Observable<Item[]> | undefined;
  // بيانات جديدة للإضافة (مثال)
  newItem: Item = {
    name: '',
    time: '',
    price: 0,
    img: '',
    category:'',
    quantity:0
  };
  items:Item[]=[];
  constructor(private _menuService: MenuService,private _cart :CartService) {}

  ngOnInit() {
    
    this.menuItems = this._menuService.getMenu();
     let haveItems:Boolean=true;
     this.menuItems.subscribe(items=>{
      if(items.length<=0)
        haveItems=false;
        console.log("have items  "+haveItems);
       
     })
   if(!haveItems)
      this._menuService.addMenuItems(this.items);
    new Swiper('.myProducts', {
      modules: [Navigation],
      slidesPerView: 1,
      slidesPerGroup: 1, // 👈 move only one
      spaceBetween: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }, 
      breakpoints: {
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      },
    });
  }
  addToCart(item:Item)
  {
    this._cart.addItem(item);
  }
}
