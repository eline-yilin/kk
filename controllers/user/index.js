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

 router.get('/register', function (req, res) {
	 var rst ={};
	 res.format({
         json: function () {
             res.json(rst);
         },
         html: function () {
				console.log('////' + JSON.stringify(rst));
             res.render('user/credit', {user:rst,name:'user'});
         }
     });
  	
  });
 
 router.post('/register', function (req, res) {
	   var CreditModel = require('../../models/user');
	   var model = new CreditModel();
	model.post
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
