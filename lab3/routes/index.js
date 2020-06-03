const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/shops', function(req, res) {
    res.render('pages/shops');
});
router.get('/stocks', function(req, res) {
    res.render('pages/stocks');
});

router.get('/ProductonShop', function(req, res) {
    res.render('pages/ProductonShop');
});

router.get('/ProductonStocks', function(req, res) {
    res.render('pages/ProductonStocks');
});

router.get('/ProductonShopsLessThen20', function(req, res) {
    res.render('pages/ProductonShop');
});

router.get('/products', function(req, res) {
    res.render('pages/products');
});

module.exports = router;