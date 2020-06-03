const path = require('path');
const express = require('express');

var monk = require('monk');
var db = monk('localhost:27017/dbshops');

var indexRouter = require('./routes/index');
var ProductsRouter = require('./routes/products');
var ShopsRouter = require('./routes/shops');
var stocksRouter = require('./routes/stocks');
var productonStockRouter = require('./routes/ProductonStocks');
var goodstoStationRouter = require('./routes/ProductonShop');



const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname))

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/service/products', ProductsRouter);
app.use('/service/shops', ShopsRouter);
app.use('/service/stocks', stocksRouter);
app.use('/service/ProductonStocks', productonStockRouter);
app.use('/service/ProductonShop', goodstoStationRouter);



const host = "localhost";
const port = "8080";
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
});

module.exports = app;
