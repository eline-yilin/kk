'use strict';


var EntityModel = require('../../models/entity');


module.exports = function (router) {

    var model = new EntityModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('entity/index', model);
            }
        });
    });

};
