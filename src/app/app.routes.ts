import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { NotFound } from './not-found/not-found';
import { Contact } from './contact/contact';
import { authGuard } from './auth-guard';
import { Menu } from './menu/menu';

export const routes: Routes = [
      {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'register',component:Register},    
    {path:'login',component:Login},
    {path:'contact',component:Contact,canActivate: [authGuard]},
    {path:'menu',component:Menu,canActivate: [authGuard]},
  //  {path:'faq',component:Menu,canActivate: [authGuard]},
    {path:'**',component:NotFound}
];
