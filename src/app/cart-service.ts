import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartId = 'guest-cart';  // ممكن تغيريها لاحقًا لو هتعملي login

  constructor(private fs: Firestore) {}

  // ========================
  // READ - Get Cart
  // ========================
  async getCart() {
    const ref = doc(this.fs, `carts/${this.cartId}`);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data()['items'] || [];
    }

    return [];
  }

  // ========================
  // CREATE / UPDATE - Save all cart items
  // ========================
  async saveCart(items: any[]) {
    const ref = doc(this.fs, `carts/${this.cartId}`);
    await setDoc(ref, { items });  // overwrite
  }

  // ========================
  // ADD item to cart
  // ========================
  async addItem(item: any) {
    let cart = await this.getCart();

    const existing = cart.find((c: any) => c.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
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
    await setDoc(ref, { items: [] });
  }
}


