import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { NotFound } from './not-found/not-found';
import { Contact } from './contact/contact';
import { authGuard } from './auth-guard';

export const routes: Routes = [
      {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home,canActivate: [authGuard]},
    {path:'register',component:Register},    
    {path:'login',component:Login},
    {path:'contact',component:Contact,canActivate: [authGuard]},

    {path:'**',component:NotFound}
];
