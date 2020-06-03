var express = require('express');
var router = express.Router();

// GET /products
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /passengers/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    var productId = req.params.id;
    collection.findOne({ id: productId }).then(function(productExists) {
        if (productExists) {
            res.send(`Товар з id ${productId} існує`);
        } else{
            res.send(`Товар з id ${productId} не існує`);
        }

        });
});
// POST /products
router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    var productId = req.params.id;
    var product = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        country: req.body.country,
    }
    collection.update({ id:productId  }, { $set: {code: product.code, name: product.name, country:product.country } }).then((result) => {
        res.send(`Успішно відредаговано планету з id ${product.id}`);
    })
});

// POST /passengers
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(productExists) {
        if (productExists) {
            res.send(`Товар з id ${req.body.id} вже існує`);
        } else{
            var product = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                country: req.body.country
            };
            collection.insert(product, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/passengers/${passenger.id}`);
                    res.send(`Успішно створена Товар з id ${product.id}`);
                }
            });
        }
    });
});

// PUT /products
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    var product = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        country: req.body.country
    };
    collection.update({ id: product.id }, product, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/passengers/${passenger.id}`);
            res.send(`Успішно відредаговано планету з id ${product.id}`);
        }
    });
});

// DELETE /products/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('products');
    var productId = req.params.id;
    collection.remove({ id: productId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено Товар з  id ${productId}`);
        }
    });
});

module.exports = router;