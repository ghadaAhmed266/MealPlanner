import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAULiaDivdhPZSK36hcec1Ww44g88o-70s",
        authDomain: "food-266.firebaseapp.com",
        projectId: "food-266",
        storageBucket: "food-266.firebasestorage.app",
        messagingSenderId: "564559297541",
        appId: "1:564559297541:web:1c4104cb0808484935f06c"
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ]
};
