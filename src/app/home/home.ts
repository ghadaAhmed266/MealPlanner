import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { MenuService } from '../menu-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service';

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
    category:''
  };
  items:Item[]=
  [
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food1.png',category:'Breakfast Food'},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food2.png',category:'Breakfast Food'},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food3.png',category:'Breakfast Food'},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food4.png',category:'Breakfast Food'},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food5.png',category:'Breakfast Food'},
    {name: 'Breakfast Food',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food6.png',category:'Breakfast Food'},
    {name: 'Cup Cake',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food7.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food8.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food9.png',category:'Breakfast Food'},
    {name: 'Pizza',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food10.png',category:'Breakfast Food'},
    {name: 'Pizza',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food11.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food12.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food13.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food14.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food15.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food16.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food17.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food18.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food19.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food20.png',category:'Breakfast Food'},
    {name: 'Gyro Sandwich',time: 'Time: 10 - 15 Minutes | Serves: 1',price:20,img: 'assets/food21.png',category:'Breakfast Food'},
    {name: 'Pasta',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food22.png',category:'Breakfast Food'},
    {name: 'Birger',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food23.png',category:'Breakfast Food'},
    {name: 'Salad',time: 'Time: 10 - 15 Minutes | Serves: 1',price:350,img: 'assets/food24.png',category:'Breakfast Food'},
  ]
  constructor(private _menuService: MenuService,private _cart :CartService) {}

  ngOnInit() {
    this.menuItems = this._menuService.getMenu();
     let haveItems:Boolean=false;
     this.menuItems.subscribe(items=>{
      if(items.length>1)
        haveItems=true;
     })
    if(!haveItems)
      this._menuService.addMenuItems(this.items);
  }
  addToCart(item:Item)
  {
    this._cart.addItem(item);
  }
}
