import { Injectable} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { UserData } from './user-data';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
 private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();
  userProfile$ = this.userId$.pipe(
    switchMap(uid => {
      if (!uid) return of(null);
      const userDoc = doc(this.fs, `users/${uid}`);
      return docData(userDoc);
    })
  );
  constructor(private auth: Auth,  private fs: Firestore) {
    // متابعة حالة المستخدم
    onAuthStateChanged(this.auth, (user) => {
      this.userIdSubject.next(user ? user.uid : null);
    });
  }

  async signup(user:UserData) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);

  const uid = userCredential.user.uid;

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

  login(user:UserData) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logout() {
    return signOut(this.auth);
  }
}