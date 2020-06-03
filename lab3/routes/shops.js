var express = require('express');
var router = express.Router();

// GET /shops
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('shops');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('shops');
    var shopsId = req.params.id;
    collection.findOne({ id: shopsId }).then(function(shopsExists) {
        if (shopsExists) {
            res.send(`Магазин з id ${shopsId} існує`);
        } else{
            res.send(`Магазин з id ${shopsId} не існує`);
        }

    });
});

// POST /shops
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('shops');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(ShopsExists) {
        if (ShopsExists) {
            res.send(`Магазин з id ${req.body.id} вже існує`);
        } else{
            var Shops = {
                id: req.body.id,
                name: req.body.name,
                address: req.body.address,
                capacity: req.body.capacity
            };
            collection.insert(Shops, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/shops/${space_station.id}`);
                    res.send(`Успішно створений Магазин з id ${Shops.id}`);
                }
            });
        }
    });
});

// PUT /shops
// router.put('/', function (req, res) {
//     var db = req.db;
//     var collection = db.get('space_stations');
//     var spaceStation = {
//         id: req.body.id,
//         name: req.body.name,
//         necessity: req.body.necessity,
//         capacity: req.body.capacity
//     };
//     collection.update({ id: spaceStation.id }, spaceStation, function (e, docs) {
//         if (e) {
//             res.send(e);
//         } else {
//             res.send(`Успішно відредагований станція з id [${spaceStation.id}]`);
//         }
//     });
// });

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('shops');
    var shopsId = req.params.id;
    //console.log(space_stationsId);
    var shops = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        capacity: req.body.capacity,
    }
    collection.update({ id:shopsId  }, { $set: { name: shops.name, address:shops.address,capacity:shops.capacity } }).then((result) => {
        res.send(`Успішно відредагований Магазин з id ${shops.id}`);
    })
});

// DELETE /space_stations/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('shops');
    var ShopsId = req.params.id;
    collection.remove({ id: ShopsId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
           
            res.send(`Успішно видалений Магазин з id ${ShopsId}`);
        }
    });
});

module.exports = router;