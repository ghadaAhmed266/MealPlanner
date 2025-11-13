import { Injectable ,inject} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserData } from './user-data';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private auth = inject(Auth);
 //private userSubject = new BehaviorSubject<User | null>(null);
  //user$ = this.userSubject.asObservable();

  constructor() {
    // متابعة حالة المستخدم
   // this.auth.onAuthStateChanged(user => this.userSubject.next(user));
  }

  signup(user:UserData) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  login(user:UserData) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logout() {
    return signOut(this.auth);
  }
}