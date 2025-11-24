import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './authService';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const uid = localStorage.getItem('uid');

    if (uid) return true;

    router.navigate(['/login']);
    return false;
}

