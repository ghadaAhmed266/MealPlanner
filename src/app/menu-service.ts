import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection,addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  constructor(private fs: Firestore) {}

  getMenu() {
    const ref = collection(this.fs, 'products');
    return collectionData(ref, { idField: 'id' })as Observable<Item[]>;
  }
  // Add new item
  addMenuItem(item: Item) {
    const ref = collection(this.fs, 'products');
    
    return addDoc(ref, item);
  }
  async addMenuItems(items: Item[]) {
    const colRef = collection(this.fs, 'products');

    for (let item of items) {
    await addDoc(colRef, item);
    }
  }
  // UPDATE item
  updateMenuItem(id: string, updatedData:  Partial<Item>) {
    const ref = doc(this.fs, `products/${id}`);
    return updateDoc(ref, updatedData);
  }


  // Delete item
  deleteMenuItem(id: string) {
    const ref = doc(this.fs, `products/${id}`);
    return deleteDoc(ref);
  }
}
