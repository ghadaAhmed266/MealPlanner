
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import {UserData} from '../user-data';
import { AuthService } from '../authService';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{
  isloading:boolean=false;
  passwordMismatch:boolean=false;
  registerForm:FormGroup=new FormGroup({
    first_name:new FormControl(null,[Validators.minLength(4),Validators.maxLength(15),Validators.required]),
    last_name:new FormControl(null,[Validators.minLength(4),Validators.maxLength(15),Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.minLength(4),Validators.required]),
    confirmPassword:new FormControl(null,[Validators.required])
  });
  constructor(private _auth:AuthService,private _route:Router){
     this.registerForm.valueChanges.subscribe(val => {
      const { password, confirmPassword } = val;
      this.passwordMismatch =(password !== confirmPassword);
    });
  }
  ngOnInit(): void {
    
  }
  registerData(registerval:FormGroup){
    this.isloading=true;
    if(registerval.valid){
     let user:UserData={email:registerval.value.email,password:registerval.value.password};
     this._auth.signup(user);
     this._route.navigate(['/login']);
    /*.subscribe({
      next:(response)=>{
        if(response.message==='success')
        {
          this.isloading=false;
          this._route.navigate(['/login']);
        }
        else
        {}
        this.isloading=false;
      }
    })*/
  }
  }
}
