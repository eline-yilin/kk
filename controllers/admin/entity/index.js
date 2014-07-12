'use strict';


var entityModel = require('../../../models/entity');
var categoryModel = require('../../../models/category');

module.exports = function (router) {

    var model = new entityModel();


    router.get('/', function (req, res) {
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
						console.log('////' + JSON.stringify(rst));
						var temp = [];
						for(var key in rst)
						{
							var item = rst[key];
							var pid = item['id'];
							// ITEM IN ARRAY
							if(temp[pid] )
							{
								if(item['url']){
									var url = item['url'];
									temp[pid]['url'].push( url.replace(".build", "") );
								}
							}
							// item not in array, init and push
							else
							{
								var url = item['url'];
								if(url)
								{
									url = url.replace(".build", "");
								}
								
								item['url'] = new Array(url);
								temp[pid] = item;
								
							}
							
						}
						var ret = [];
						for(var key in temp)
							{
							if(temp[key])
								{
								ret.push(temp[key]);
								}
							}
		                res.render('admin/entity/index', {items:ret,name:'entity'});
		            }
		        });
				}
			}
    	);
       
    });
    
    router.get('/add', function (req, res) {
    	var model = new categoryModel();
    	model.get
    	({parent_id:1},
    		function (err, rst) {res.render('admin/entity/add', {category:rst,name:'credit'});}
    	);
       
    });
    
    	router.post('/add', function (req, res) {
	 	var  fs = require('fs');
	 	var body = req.body;
	 	body.img = [];

	 	for(var key in req.files)
	 	{
	 		var img = req.files[key];
	 		if(img.name && img.name != '')
	 		{
	 			 var tmp_path = img.path;
	 			 var target_path =   '.build/img/upload/entity_' + img.name;
	 			console.log('try to rename ' + tmp_path + ' to ' +　target_path);
	 			try{		
	 			var fw = fs.openSync(target_path,'w');
	 			var content = fs.readFileSync(tmp_path);
	 		    fs.writeFileSync(target_path, content );
	 		    fs.close(fw);
	 		    console.log('unlink ' + tmp_path);
	 	        fs.unlinkSync(tmp_path);
	 			// fs.renameSync(tmp_path, target_path);
	 		}
	 		catch(error){console.log(error);}
 		 	    body.img.push( target_path);
 		 	    // fs.unlinkSync(tmp_path);
	 		}
	 		
	 	}
	 
	 	 console.log(body.img);
		    model.post(body,function (err, rst) {
				if (err) {
					console.log(err);
					 res.render('admin/entity/add', {error:err,name:'entity'});
				}
				else{
			        res.format({
			            json: function () {
			                res.json(rst);
			            },
			            html: function () {
			            	if(rst)
			            		{
			            		res.redirect('/admin/entity/');
			            		// res.render('admin/entity/add',
								// {sucess:rst,name:'entity'});
			            		}
			            }
			        });
					}
				});

    });
    
    	router.post('/delete/:id', function (req, res) {
    		var id = req.params.id;
    		console.log('////////////////delete product id ' +　id  + '//////////////////////');
    	   	 model.delete
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
    			                res.redirect('/admin/product/');
    			            }
    			        });
    					}
    				}
    	   	);
            
        });

};
