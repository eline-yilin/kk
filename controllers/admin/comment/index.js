'use strict';


var CommentModel = require('../../../models/comment');


module.exports = function (router) {

    var model = new CommentModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/comment/index', model);
            }
        });
    });

};
