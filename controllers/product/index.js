'use strict';


var ProductModel = require('../../models/product');


module.exports = function (router) {

    var model = new ProductModel();


    router.get('/', function (req, res) {
    			 console.log('////////////////product//////////////////////');
		    	 model.get
		    	(
		    		function (err, products) {
					if (err) {
						console.log(err);
					}
					else{
				        res.format({
				            json: function () {
				                res.json(products);
				            },
				            html: function () {
				            	products = JSON.stringify(products);
								console.log('////' + products);
				                res.render('product/index', {'products': products});
				            }
				        });
						}
					}
		    	);
    });

};
