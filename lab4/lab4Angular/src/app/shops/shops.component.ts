import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops;
  newShopItem = {
    name: '',
    address: ''
  };
  newValue = {
    name: '',
    address: '',
    _id: 0
  };

  deleteItem = {
    _id: 0
  }

  constructor(private Shop: ShopService) { }

  ngOnInit(): void {
    this.Shop.getShops().subscribe(shops => this.shops = shops)
  }

  addNewShop() {
    this.Shop.addShop(this.newShopItem).subscribe()
    console.log(22);
  }

  deleteShop(_id: any) {
    this.deleteItem._id = _id;
    this.Shop.deleteShop(this.deleteItem).subscribe()
  }
  showId = -1;

  show(i: number) {
    this.showId = i;
  }

  editShop(_id: any) {
    this.newValue._id = _id;
    this.Shop.editShop(this.newValue).subscribe()
  }
}
