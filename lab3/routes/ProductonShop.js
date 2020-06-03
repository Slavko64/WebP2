var express = require('express');
var router = express.Router();

// GET /goodsto_products
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('productonStocks');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});
 
// GET /goodsto_Stations/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('productonStocks');
    var goodstoStationId = req.params.id;
    collection.findOne({id: goodstoStationId}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collectionLessThen20 =[];
    var collection = db.get('productonStocks');
    var shops = db.get('shops');
    let result = {};
    collection.find({}).then((docs) => {
        docs.forEach((value) => {
                result[value.Shops] = result[value.Shops] + 1 || 1;
            });
    });

    shops.find({}).then((docs) => {
        docs.forEach((value)=>{
            for (let key in result){
                if(value.id == key && +value.capacity*0.3 > result[key])
                {
                    collectionLessThen20.push(value);
                    break;
                }
            }
        })
        res.json(collectionLessThen20);
    });

});


// POST /goodsto_Stations
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('productonStocks');
    var shops = db.get('shops');
    var goods= db.get('goods');
    let result={};
    let b = true

    shops.findOne({ id: req.body.Shops }, {}, function (e, docs) {
        return !!docs;
    }).then(function(goodstoStationExists) {
            if (goodstoStationExists) {
                goods.findOne({ id: req.body.goods }, {}, function (e, docs) {
                    return !!docs;
                }).then(function(goodstoStationExists) {
                    if (goodstoStationExists) {
                        collection.findOne({ id: req.body.id }, {}, function (e, docs) {
                            return !!docs;
                        }).then(function(goodstoStationExists) {
                            if (goodstoStationExists) {
                                res.send(`Вантаж на станції з id ${req.body.id} вже існує`);
                            } else {
                                collection.find({}).then((docs) => {
                                    docs.forEach((value) => {
                                        result[value.Shops] = result[value.Shops] + 1 || 1;

                                    });

                                });

                                shops.find({}).then((docs) => {
                                    docs.forEach((value)=> {

                                        for (let key in result) {

                                            if (value.id==req.body.Shops && value.id== key && +value.capacity <= result[key] && +value.necessity*1.2 <= result[key] ) {
                                                b=false;
                                                break;
                                            }

                                        }
                                    })
                                    if(b) {
                                        var goodstoStation = {
                                            id: req.body.id,
                                            Shops: req.body.Shops,
                                            goods: req.body.goods
                                        };
                                        collection.insert(goodstoStation, function (e, docs) {
                                            if (e) {
                                                res.send(e);
                                            } else {
                                                
                                                res.send(`Успішно створений вантаж на станції з id ${goodstoStation.id}`);
                                            }
                                        });
                                    }
                                    else{
                                        res.send(`На станції з id ${req.body.Shops} немає місця для вантажу!`);
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        res.send(`Вантажу з id ${req.body.goods} не існує`);
                    }})
            }
            else
            {
                res.send(`Станції з id ${req.body.Shops} не існує`);
            }
        }
    );

});

// PUT /goodsto_Stations
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('productonStocks');
    var goodstoStation = {
        id: req.body.id,
        Shops: req.body.Shops,
        goods: req.body.goods
    };
    collection.update({ id: goodstoStation.id }, goodstoStation, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully updated goods on Station with id [${goodstoStation.id}]`);
        }
    });
});

// DELETE /goodsto_Stations/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoStations');
    var goodstoStationId = req.params.id;
    collection.remove({ id: goodstoStationId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted goods on Station with id ${goodstoStationId}`);
        }
    });
});

module.exports = router;