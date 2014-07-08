'use strict';


var NewsModel = require('../../../models/news');


module.exports = function (router) {

    router.get('/', function (req, res) {
        
    	res.render('admin/news/index', model);
    });
    
    router.get('/add', function (req, res) {
	res.render('admin/news/add', model);
	
    });
    
    router.post('/add', function (req, res) {
    	var model = new NewsModel();
    	model.post(req.body,function(err, rst){
    		if (err) {
    			console.log(err);
    		}
    		else{
    			res.render('admin/news/index', model);
    		}
    	});
    	
    	
        });

};
