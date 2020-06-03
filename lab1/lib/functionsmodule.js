const shop = require("./shopmodule.js");
const product = require("./productmodule.js");
const stock = require("./stockmodule.js");
const productfromstock  = require("./productfromstockmodule.js");
let ArrayShop = [];
let ArrayProduct = [];
let ArrayStock = [];
let ArrayProductFromStock = [];
function AddShop(name){
    ArrayShop.push(new shop.Shop(name));
}

function EditShop(oldname, newname){
    ArrayShop.forEach(i => {
        if(i.name == oldname)
            i.name = newname;
    });
    ArrayProduct.forEach(i => {
        if(i.shopname == oldname)
            i.shopname = newname;
    });
}

function RemoveShop(name){
    ArrayShop.forEach(i => {
        if(i.name == name)
        ArrayShop.splice(ArrayShop.indexOf(i),1);
    });
    ArrayProduct.forEach(i => {
        if(i.shopname == name)
        RemoveProduct(name);
    });
}

function SearchShop(name){
    let index = -1;
    ArrayShop.forEach(i => {
        if(i.name == name){
            index = ArrayShop.indexOf(i);
             
        }
    });
    return index;
}


function AddProduct(name, shopname){
    if(SearchShop(shopname) != -1)
     ArrayProduct.push(new product.Product(name, shopname));
 }
 
 function EditProduct(oldname, newname){
     ArrayProduct.forEach(i => {
         if(i.name == oldname)
             i.name = newname;
     });
 }
 
 function RemoveProduct(name, shopname){
     ArrayProduct.forEach(i => {
         if(i.name == name && i.shopname == shopname)
             ArrayProduct.splice(ArrayProduct.indexOf(i),1);
     });
 }
 
 function SearchProduct(name, shopname){
     let index = -1;
     ArrayProduct.forEach(i => {
         if(i.name == name && i.shopname == shopname){
             index = ArrayProduct.indexOf(i);
              
         }
     });
     return index;
 }



 function AddStock(name){
    ArrayStock.push(new stock.Stock(name));
}

function EditStock(oldname, newname){
    ArrayStock.forEach(i => {
        if(i.name == oldname)
            i.name = newname;
    });
    ArrayProductFromStock.forEach(i => {
        if(i.Stockname == oldname)
            i.Stockname = newname;
    });
}

function RemoveStock(name){
    ArrayStock.forEach(i => {
        if(i.name == name)
            ArrayStock.splice(ArrayStock.indexOf(i),1);
    });
    ArrayProductFromStock.forEach(i => {
        if(i.Stockname == name)
        RemoveProductFromStock(i.name, name);
    });
}

function SearchStock(name){
    let index = -1;
    ArrayStock.forEach(i => {
        if(i.name == name){
            index = ArrayStock.indexOf(i);
             
        }
    });
    return index;
}

function AddProductFromStock(name, stockname){
    if(SearchStock(stockname) != -1)
    ArrayProductFromStock.push(new productfromstock.ProductFromStock(name, stockname));
}


function RemoveProductFromStock(name, stockname){
    ArrayProductFromStock.forEach(i => {
        if(i.name == name && i.stockname == stockname)
            ArrayProductFromStock.splice(ArrayProductFromStock.indexOf(i),1);
    });
}
function SearchProductFromStock(name, stockname){
    let index = -1;
    ArrayProductFromStock.forEach(i => {
        if(i.name == name && i.stockname == stockname){
            index = ArrayProductFromStock.indexOf(i);
            }
    });
    return index;
}
function TransferProduct(name, stock1, stock2){
    RemoveProductFromStock(name, stock1);
    AddProductFromStock(name,stock2);
}

function ShipmentProduct(name, stock, shop){
    if(SearchProductFromStock(name, stock) != -1){
        RemoveProductFromStock(name,stock);
        AddProduct(name, shop);
    }
}
module.exports = { AddShop, EditShop, RemoveShop, SearchShop, AddProduct, EditProduct, RemoveProduct, SearchProduct, AddStock, EditStock, RemoveStock, SearchStock, AddProductFromStock, TransferProduct, RemoveProductFromStock, ShipmentProduct, ArrayShop, ArrayProduct, ArrayStock, ArrayProductFromStock};