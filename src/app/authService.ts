import { Injectable} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { UserData } from './user-data';
import { Router } from '@angular/router';
import { CartService } from './cart-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
 private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  private cartIdSubject = new BehaviorSubject<string>('guest-cart');
  cartId$ = this.cartIdSubject.asObservable();
  // GET USER PROFILE
 userProfile$ = this.userId$.pipe(
  switchMap(uid => {
    if (!uid) return of(null);
    const userDoc = doc(this.fs, `users/${uid}`);
    return docData(userDoc);
  })
);


  constructor(private auth: Auth, private fs: Firestore, private _router: Router) {
    onAuthStateChanged(this.auth, (user) => {
     if (user) {
        this.userIdSubject.next(user.uid);
        this.cartIdSubject.next(user.uid); 
        localStorage.setItem('uid',user.uid);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userIdSubject.next(null);
        this.cartIdSubject.next('guest-cart'); 
        localStorage.removeItem('uid');
        localStorage.removeItem('user');


      }
    });
  }

  async signup(user:UserData) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);

  const uid = userCredential.user.uid;

  localStorage.setItem('uid',uid);
  localStorage.setItem('user', JSON.stringify(userCredential.user));
  this.cartIdSubject.next(uid);
  // Save additional user info in Firestore
  const userRef = doc(this.fs, `users/${uid}`);
  await setDoc(userRef, {
    firstName: user.firstName,
    lastName:user.lastName,
    email: user.email,
    createdAt: new Date(),
    role: 'user'
  });

  return uid;
  }

  async login(user:UserData) {
     const res = await signInWithEmailAndPassword(this.auth, user.email, user.password);
     this.cartIdSubject.next(res.user.uid);
    localStorage.setItem('uid', res.user.uid);
    localStorage.setItem('user', JSON.stringify(res.user));
     this._router.navigate(['/home']);
     return res.user.uid;
  }


  logout() {
     this.userIdSubject.next(null);
        this.cartIdSubject.next('guest-cart'); 
        localStorage.removeItem('uid');
        localStorage.removeItem('user');
    return signOut(this.auth);
  }
}