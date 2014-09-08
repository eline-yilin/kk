'use strict';
module.exports = function (router) {

    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/activity/index', model);
            }
        });
    });
router.get('/comment', function (req, res) {
        
        res.format({
            json: function () {
                res.json({name:'activity'});
            },
            html: function () {
                res.render('admin/activity/comment', {name:'activity'});
            }
        });
    });
router.post('/comment', function (req, res) {	
 	var body = req.body;
 	var ActivityModel = require('../../../models/activity');

	var model = new ActivityModel();
    model.post(body,function (err, rst) {
			if (err) {
				console.log(err);
				 res.render('admin/activity/comment', {error:err,name:'activity'});
			}
			else{
		        res.format({
		            json: function () {
		                res.json(rst);
		            },
		            html: function () {
		            	if(rst)
		            		{
		            		 res.render('admin/activity/comment', {list:rst,name:'activity'});
		            		//res.render('admin/product/add', {sucess:rst,name:'product'});
		            		}
		            }
		        });
				}
			});


});

router.get('/comment/make', function (req, res) {

	var startdate = req.query.startdate;
	var enddate = req.query.enddate;
	var number = req.query.number;
 	var ActivityModel = require('../../../models/activity');

	var model = new ActivityModel();
    model.make({startdate:startdate,enddate:enddate,number:number},function (err, rst) {
			if (err) {
				console.log(err);
				res.json(err);
			}
			else{
		        res.format({
		            json: function () {
		            	console.log(rst);
		                res.json(rst);
		            },
		            html: function () {
		            	
		            }
		        });
				}
			});


});
};

function randomNfromArray(arr, n){

	 var added = 0;
	 var $filtered = []; //create a new jQuery object we're going to fill
	    var $random;
	    while ($filtered.length < n ) {
	        $random = arr[Math.round(Math.random() * arr.length];
	        if(!$filtered.contains($random)) 
	        	{
	        		$filtered.push($random); //grab some random element from links
	        	}
	    }
}
