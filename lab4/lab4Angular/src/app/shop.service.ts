import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getGoods(): Observable<any>{
    return this.http.get(`http://localhost:3000/allGoods`);
  }
  addGoods(body): Observable<any>{
    return this.http.post(`http://localhost:3000/addGoods`, body);
  }
  deleteGoods(body): Observable<any>{
    return this.http.post(`http://localhost:3000/deleteGoodId/${body._id}`, body);
  }
  editGoods(body): Observable<any>{
    return this.http.post(`http://localhost:3000/editGoods/${body._id}`, body);
  }

  getStorage(): Observable<any>{
    return this.http.get(`http://localhost:3000/allStorage`);
  }
  addStorage(body): Observable<any>{
    return this.http.post(`http://localhost:3000/addStorage`, body);
  }
  deleteStorage(body): Observable<any>{
    return this.http.post(`http://localhost:3000/deleteStorage/${body._id}`, body);
  }

  getShops(): Observable<any>{
    return this.http.get(`http://localhost:3000/allShops`);
  }
  addShop(body): Observable<any>{
    return this.http.post(`http://localhost:3000/addShop`, body);
  }
  editShop(body): Observable<any>{
    return this.http.post(`http://localhost:3000/editShop/${body._id}`, body);
  }
  deleteShop(body): Observable<any>{
    return this.http.post(`http://localhost:3000/deleteBtId/${body._id}`, body);
  }

  addGoodsToStore(body): Observable<any>{
    return this.http.post(`http://localhost:3000/addGoodsToStorage/${body._id}`, body);
  }

}
