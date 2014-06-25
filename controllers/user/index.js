'use strict';

module.exports = function (router) {

    router.get('/', function (req, res) {
    	var UserModel = require('../../models/user');
    	var model = new UserModel();
    	model.get
    	(
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
						console.log('////' + JSON.stringify(rst));
		                res.render('user/index', {user:rst,name:'user'});
		            }
		        });
				}
			}
    	);
    	
    });
    
 router.get('/credit', function (req, res) {
	   var CreditModel = require('../../models/credit');
	   var model = new CreditModel();
    	model.get
    	(
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
						console.log('////' + JSON.stringify(rst));
		                res.render('user/credit', {credits:rst,name:'user'});
		            }
		        });
				}
			}
    	);
    	
    });

};
