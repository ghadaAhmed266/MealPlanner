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
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

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
  items:Item[]=
  [
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food1.png',category:'Breakfast Food',quantity:100},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food2.png',category:'Breakfast Food',quantity:100},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food3.png',category:'Breakfast Food',quantity:100},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food4.png',category:'Breakfast Food',quantity:100},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food5.png',category:'Breakfast Food',quantity:100},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food6.png',category:'Breakfast Food',quantity:100},
    {name: 'Cup Cake',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food7.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food8.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food9.png',category:'Breakfast Food',quantity:100},
    {name: 'Pizza',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food10.png',category:'Breakfast Food',quantity:100},
    {name: 'Pizza',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food11.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food12.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food13.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food14.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food15.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food16.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food17.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food18.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food19.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food20.png',category:'Breakfast Food',quantity:100},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food21.png',category:'Breakfast Food',quantity:100},
    {name: 'Pasta',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food22.png',category:'Breakfast Food',quantity:100},
    {name: 'Birger',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food23.png',category:'Breakfast Food',quantity:100},
    {name: 'Salad',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food24.png',category:'Breakfast Food',quantity:100},
  ]
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
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3 }
      },
    });
  }
  addToCart(item:Item)
  {
    this._cart.addItem(item);
  }
}
