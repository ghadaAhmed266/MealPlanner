import { Injectable, OnInit } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Item } from './item';
import { AuthService } from './authService';
import { BehaviorSubject, Subject } from 'rxjs';

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

    const existing = cart.find((c: any) => c.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ item});
    }

    await this.saveCart(cart);
  }

  // ========================
  // UPDATE quantity
  // ========================
  async updateQuantity(id: string, qty: number) {
    let cart = await this.getCart();

    const item = cart.find((i: any) => i.id === id);
    if (!item) return;

    item.quantity = qty;

    if (item.quantity <= 0) {
      cart = cart.filter((i: any) => i.id !== id);
    }

    await this.saveCart(cart);
  }

  // ========================
  // DELETE item
  // ========================
  async removeItem(id: string) {
    let cart = await this.getCart();
    cart = cart.filter((i: any) => i.id !== id);

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


