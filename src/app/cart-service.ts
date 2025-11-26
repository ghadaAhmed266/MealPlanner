import { Injectable, OnInit ,runInInjectionContext} from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, docData } from '@angular/fire/firestore';
import { Item } from './item';
import { AuthService } from './authService';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartId = 'guest-cart';  // ممكن تغيريها لاحقًا لو هتعملي login
  cartItems=new BehaviorSubject(0);
  cartItems$ = this.cartItems.asObservable();
  constructor(private fs: Firestore,private authService: AuthService) {
    this.authService.cartId$.subscribe(id => {
    this.cartId = id;
  });
  }
setCartId(uid: string) {
  this.cartId = uid;
  this.loadCartItemsCount(); // ← تحميل العدد الحقيقي من Firebase
}
async loadCartItemsCount() {
  const items = await this.getCart(); // ← بتجيب items من Firebase
  this.cartItems.next(items.length);
}

  // ========================
  // READ - Get Cart
  // ========================
  getCartItems(): Observable<any[]> {
  const ref = doc(this.fs, `carts/${this.cartId}`);

  return docData(ref).pipe(
    map((data: any) => data?.items || [])
  );
} 
  async getCart() {
    const ref = doc(this.fs, `carts/${this.cartId}`);
    const snap = await getDoc(ref);
    
    if (snap.exists()) {
      const items=snap.data()['items'] || [];
      this.cartItems.next(items.length);
      return items;
    }

    return [];
  }

  // ========================
  // CREATE / UPDATE - Save all cart items
  // ========================
  async saveCart(items: Item[]) {
    const ref = doc(this.fs, `carts/${this.cartId}`);
    this.cartItems.next(items.length);
    await setDoc(ref, { items });  // overwrite
  }

  // ========================
  // ADD item to cart
  // ========================
  async addItem(item: Item) {
    let cart = await this.getCart();
    const existing = cart.find((c: any) => c.item.id === item.id);
    if (existing) {
      existing.item.quantity++;
    } 
    else {
      item.quantity=1;
      cart.push({ item});
    }
    await this.saveCart(cart);
  }

  // ========================
  // UPDATE quantity
  // ========================
  async updateQuantity(id: string, qty: number) {
    let cart = await this.getCart();

    const item = cart.find((i: any) => i.item.id === id);
    if (!item) return;

    item.item.quantity = qty;

    if (item.item.quantity <= 0) {
      cart = cart.filter((i: any) => i.item.id !== id);
    }

    await this.saveCart(cart);
  }

  // ========================
  // DELETE item
  // ========================
  async removeItem(id: string) {
    let cart = await this.getCart();
    cart = cart.filter((i: any) => i.item.id !== id);

    await this.saveCart(cart);
  }

  // ========================
  // CLEAR cart
  // ========================
  async clearCart() {
    const ref = doc(this.fs, `carts/${this.cartId}`);
    this.cartItems.next(0);
    await setDoc(ref, { items: [] });
  }
}


