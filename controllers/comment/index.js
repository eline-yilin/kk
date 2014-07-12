'use strict';


var CommentModel = require('../../models/comment');

var Utility = require("../../lib/utility");
var util = new Utility();

module.exports = function (router) {
   
    router.get('/', function (req, res) {
    	var model = new CommentModel();
    	var uid = req.cookies && req.cookies.uid;
    	model.get
    	({user_id:uid},
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
		                res.render('comment/index', {items:rst,name:'comment'});
		            }
		        });
				}
			}
    	);
    	
    
    });
    
    router.get('/add', function (req, res) {
    	 res.render('comment/add', {items:{},name:'comment'});
    });
    
    router.post('/add', function (req, res) {

    	var model = new CommentModel();
		var title = req.body.title;
		var content = req.body.content;
		var uid = req.cookies.uid;
		model.post({title:title,content:content,user_id:uid,status_id:0,updated:util.convertDateTime(new Date())}, function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				
					
					if(rst && rst[0])
					{
						rst = rst[0];
						
					}
					res.redirect('/comment');
					//res.json(rst);				
			}
		});

   
   });

};
