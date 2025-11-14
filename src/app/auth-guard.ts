import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './authService';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
   return authService.userId$.pipe(
    take(1),
    map(uid => {
      if (uid) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
}

