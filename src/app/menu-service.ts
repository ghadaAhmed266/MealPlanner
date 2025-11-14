import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection,addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  constructor(private fs: Firestore) {}

  getMenu() {
    const ref = collection(this.fs, 'menu');
    return collectionData(ref, { idField: 'id' });
  }
  // Add new item
  addMenuItem(item: any) {
    const ref = collection(this.fs, 'menu');
    return addDoc(ref, item);
  }
  // UPDATE item
  updateMenuItem(id: string, updatedData: any) {
    const ref = doc(this.fs, `menu/${id}`);
    return updateDoc(ref, updatedData);
  }


  // Delete item
  deleteMenuItem(id: string) {
    const ref = doc(this.fs, `menu/${id}`);
    return deleteDoc(ref);
  }
}
