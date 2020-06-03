var express = require('express');
var router = express.Router();

// GET /stocks
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /stocks/{id}

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    var stocksId = req.params.id;
    collection.findOne({ id: stocksId }).then(function(stocksExists) {
        if (stocksExists) {
            res.send(`Склад з id ${stocksId} існує`);
        } else{
            res.send(`Склад з id ${stocksId} не існує`);
        }

    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    var stocksId = req.params.id;
    var stocks = {
        id: req.body.id,
        number: req.body.number,
        shop: req.body.shop,
        capacity: req.body.capacity,
    }
    collection.update({ id:stocksId  }, { $set: { number: stocks.number, shop:stocks.shop,capacity:stocks.capacity } }).then((result) => {
        res.send(`Успішно оновлено склад з id ${stocks.id} `);
    })
});

// POST /stocks
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(stocksExists) {
        if (stocksExists) {
            res.send(`склад з id ${req.body.id} вже існує`);
        } else {
            var stocks = {
                id: req.body.id,
                number: req.body.number,
                shop: req.body.shop,
                capacity: req.body.capacity,
            };
            collection.insert(stocks, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(`Успішно створено склад з id ${stocks.id}`);
                }
            });
        }
    });
});

// PUT /stocks
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    var stocks = {
        id: req.body.id,
        number: req.body.number,
        shop: req.body.shop,
        capacity: req.body.capacity
    };
    collection.update({ id: stocks.id }, stocks, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно оновлено вантаж з id [${stocks.id}]`);
        }
    });
});

// DELETE /stocks/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('stocks');
    var stocksId = req.params.id;
    collection.remove({ id: stocksId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено склад з id ${stocksId}`);
        }
    });
});

module.exports = router;