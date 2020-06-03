import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoodsComponent } from './goods/goods.component';
import { ShopsComponent } from './shops/shops.component';
import { StoragesComponent } from './storages/storages.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    ShopsComponent,
    StoragesComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
