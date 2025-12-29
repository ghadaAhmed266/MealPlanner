import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { MenuService } from '../menu-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,Menu],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  {
}