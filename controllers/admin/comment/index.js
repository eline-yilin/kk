'use strict';


var CommentModel = require('../../../models/comment');


module.exports = function (router) {

    var model = new CommentModel();


    router.get('/', function (req, res) {
    	

    	var model = new CommentModel();
    	//var uid = req.cookies && req.cookies.uid;
    	model.get
    	({},
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
				console.log('////' + JSON.stringify(rst));
                res.render('admin/comment/index', {items:rst,name:'comment'});
				}
			}
    	);
    	
    
    
    });

};
