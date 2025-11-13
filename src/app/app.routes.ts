import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
      {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'register',component:Register},    
    {path:'login',component:Login},
    {path:'**',component:NotFound}
];
