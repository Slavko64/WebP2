import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  goods;
  newGoodItem = {
    name: '',
    code: '',
    country: ''
  };
  deleteItem = {
    _id: 0
  }
  constructor(private Shop: ShopService) { }

  ngOnInit(): void {
    this.Shop.getGoods().subscribe(good => this.goods = good)
  }

  addNewGood() {
    this.Shop.addGoods(this.newGoodItem).subscribe()
  }

  deleteGood(_id: any) {
    this.deleteItem._id = _id;
    this.Shop.deleteGoods(this.deleteItem).subscribe()
  }


  newValue = {
    name: '',
    country: '',
    _id: 0
  };
  showId = -1;
  show(i: number) {
    this.showId = i;
  }

  editGood(_id: any) {
    this.newValue._id =_id;
    this.Shop.editGoods(this.newValue).subscribe()
  }
}
