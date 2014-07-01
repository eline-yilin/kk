'use strict';


var AdminModel = require('../../models/admin');


module.exports = function (router) {

    var model = new AdminModel();

    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/index', model);
            }
        });
    });
    
    router.get('/users', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/index', model);
            }
        });
    });
    
   router.get('/orders', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/index', model);
            }
        });
    });
   
   router.get('/products', function (req, res) {
       
       res.format({
           json: function () {
               res.json(model);
           },
           html: function () {
               res.render('admin/index', model);
           }
       });
   });

};
