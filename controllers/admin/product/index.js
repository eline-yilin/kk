'use strict';


var ProductModel = require('../../../models/product');


module.exports = function (router) {

    var model = new ProductModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/product/index', model);
            }
        });
    });
    
    router.get('/add', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/product/add', {data:model, name:'product'});
            }
        });
    });
    
    	router.post('/add', function (req, res) {
	 	var  fs = require('fs');
	 	var body = req.body;
	 	body.img = [];
	 	var url_count = 0;

	 	for(var key in req.files)
	 	{
	 		var img = req.files[key];
	 		if(img.name && img.name != '')
	 		{
	 			url_count++;
	 			 var tmp_path = img.path;
	 			 var target_path =   '.build/img/upload/' + img.name;

	 			fs.rename(tmp_path, target_path, function(err) {
	 		 	    if (err) 
	 		 	    	{
	 		 	    	console.log(err);
	 		 	    	throw err;
	 		 	    	}
	 		 	   console.log('rename ' + tmp_path + ' to ' +　target_path);
	 		 	    body.img.push( target_path);
	 		 	    fs.unlink(tmp_path, function() {
	 		 	      if (err) throw err;  
	 		 	    });
	 		 	  });
	 			 
	 		}
	 		
	 	}
	 	var interval = setInterval(function() {
	 		  if (body.img.length >= url_count) {
	 		    clearInterval(interval);
	 		    console.log(body.img);
	 		   console.log(JSON.stringify(body.img));
	 		    model.post(body,function (err, rst) {
	 				if (err) {
	 					console.log(err);
	 					 res.render('admin/product/add', {error:err,name:'product'});
	 				}
	 				else{
	 			        res.format({
	 			            json: function () {
	 			                res.json(rst);
	 			            },
	 			            html: function () {
	 			            	if(rst)
	 			            		{
	 			            		res.redirect('/admin/product/');
	 			            		//res.render('admin/product/add', {sucess:rst,name:'product'});
	 			            		}
	 			            }
	 			        });
	 					}
	 				});
	 		  }
	 		}, 1000);
	 	
	    
	    
    	

    });

};
