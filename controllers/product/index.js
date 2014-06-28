'use strict';


var ProductModel = require('../../models/product');


module.exports = function (router) {

    var model = new ProductModel();


    router.get('/', function (req, res) {
    			 console.log('////////////////product//////////////////////');
		    	 model.get
		    	({},
		    		function (err, rst) {
					if (err) {
						console.log(err);
					}
					else{
				        res.format({
				            json: function () {
				                res.json(rst);
				            },
				            html: function () {
				            	//products = JSON.stringify(products);
								console.log('////' + rst);
				                res.render('product/index', {products:rst,name:'product'});
				            }
				        });
						}
					}
		    	);
    });
    router.get('/id/:id', function (req, res) {
    	 var id = req.params.id;
		 console.log('////////////////product id ' +　id  + '//////////////////////');
   	 model.id
   	(id,
   		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
		        res.format({
		            json: function () {
		                res.json(rst);
		            },
		            html: function () {
		                res.render('product/id', {products:rst,name:'product'});
		            }
		        });
				}
			}
   	);
});

};
