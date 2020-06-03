import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GoodsComponent} from "./goods/goods.component";
import {ShopsComponent} from "./shops/shops.component";
import {StoragesComponent} from "./storages/storages.component";


const routes: Routes = [
  {path: 'goods', component: GoodsComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'storage', component: StoragesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
