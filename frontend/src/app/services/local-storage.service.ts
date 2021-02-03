import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
     var pageUrls = localStorage.getItem('page-links');
    var pageInfo = localStorage.getItem('page-info');
    
  }

  private encrypt(data: any, key: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    } catch (e) {
      console.log(e);
    }
  }

  private decrypt(data: any, key: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, key);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  setKey(key: string, data: any): void {
    data = this.encrypt(data, key).toString();
    localStorage.setItem(key, data);
  }

  getKey(key: any): any {
    if (localStorage.getItem(key)) {
      return this.decrypt(localStorage.getItem(key), key);
    }
  }

  clearStorage() {
    localStorage.clear();
  }
  removeKey(key: string) {
    localStorage.removeItem(key);
  }
}
