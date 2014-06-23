'use strict';


var CreditModel = require('../../models/credit');


module.exports = function (router) {

    var model = new CreditModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('credit/index', model);
            }
        });
    });

};
