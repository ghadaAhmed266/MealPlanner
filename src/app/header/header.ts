import { afterNextRender, Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink ,RouterLinkActive} from "@angular/router";
import { AuthService } from '../authService';
import {UserData} from '../user-data'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{

  constructor(private authService:AuthService,private _router:Router){}

  islogin:boolean=false;
  userName: string | null = null;
  private sub: Subscription | undefined;

  ngOnInit(): void { 
    this.sub = this.authService.userProfile$.subscribe(user => {
      this.userName = user ? user['firstName'] : null;
      this.islogin=(this.userName!=null);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  logout(){
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
