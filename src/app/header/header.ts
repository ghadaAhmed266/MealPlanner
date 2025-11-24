import {  Component, OnInit } from '@angular/core';
import {  Router, RouterLink ,RouterLinkActive} from "@angular/router";
import { AuthService } from '../authService';
import {  Subscription } from 'rxjs';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{

  constructor(private authService:AuthService,private _router:Router,private _cart:CartService){  }

  islogin:boolean=false;
  userName: string | null = null;
  private sub: Subscription | undefined;
  cartitemsCount:number=0;

  ngOnInit(): void { 
     const savedUser = localStorage.getItem('user');
  this.userName = savedUser ? JSON.parse(savedUser).firstName : null;
  this.islogin = !!savedUser;

  // subscribe also to updates from auth service
  this.sub = this.authService.userProfile$.subscribe(user => {
    if (user) {
      this.userName = user['firstName'];
      this.islogin = true;

      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.islogin = false;
      this.userName = null;
      localStorage.removeItem('user');
    }
  });
  this._cart.getCart();
    this._cart.cartItems$.subscribe(
      val => {this.cartitemsCount=val;console.log(val)}
    )
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  logout(){
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
