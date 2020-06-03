import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {
  storage;
  goods;
  newStorageItem = {
    number: 0,
    capacity: 0
  };
  constructor(private Shop: ShopService) { }

  ngOnInit(): void {
    this.Shop.getStorage().subscribe(stor => this.storage = stor)
    this.Shop.getGoods()
      .subscribe(goods => this.goods = goods)  }

  addNewStorage() {
    this.Shop.addStorage(this.newStorageItem).subscribe()
  }
  deleteItem = {
    _id: 0
  }
  showId = -1;
  show(i: number) {
    this.showId = i;
  }

  deleteStorage(_id: any) {
      this.deleteItem._id = _id;
      this.Shop.deleteStorage(this.deleteItem).subscribe()
  }

  goodToStorage = {
    index: 0,
    _id: 0
  };

  addGood(_id: any) {
    console.log(_id);
    this.goodToStorage._id = _id;
    console.log(this.goodToStorage);
    this.Shop.addGoodsToStore(this.goodToStorage).subscribe()
  }

  getI(index: number) {
    this.goodToStorage.index = index;
    console.log(this.goodToStorage);

  }
}
