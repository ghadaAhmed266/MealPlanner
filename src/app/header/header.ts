import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../authService';
import {UserData} from '../user-data'

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{

  constructor(private _auth:AuthService){}

  islogin:boolean=false;
  userName:string="User Name";

  ngOnInit(): void {
    /*this._auth.userData.subscribe({
      next:()=>{
        if(this._auth.userData.getValue()!=null)
        {this.islogin=true;
          this.userName=JSON.stringify( this._auth.userData.getValue());
        }
        else{
          this.islogin=false;
        }
      }})*/
  }
  logout(){
    this._auth.logout();
  }
}
