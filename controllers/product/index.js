'use strict';


var ProductModel = require('../../models/product');


module.exports = function (router) {

    var model = new ProductModel();


    router.get('/', function (req, res) {
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('product/index', model);
            }
        });
    });

};
