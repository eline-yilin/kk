'use strict';


var entityModel = require('../../../models/entity');


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
							console.log(pid+'---');
							//ITEM IN ARRAY
							if(temp[pid] )
							{
								if(item['url']){
									var url = item['url'];
									temp[pid]['url'].push( url.replace(".build", "") );
								}
							}
							//item not in array, init and push
							else
							{
								var url = item['url'];
								if(url)
								{
									url = url.replace(".build", "");
								}
								
								item['url'] = new Array(url);
								temp[pid] = item;
								console.log(temp);
							}
							
						}
		                res.render('admin/entity/index', {items:temp,name:'entity'});
		            }
		        });
				}
			}
    	);
       
    });
    
    router.get('/add', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/entity/add', {data:model, name:'entity'});
            }
        });
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
	 			//fs.renameSync(tmp_path, target_path);
	 		}
	 		catch(error){console.log(error);}
 		 	    body.img.push( target_path);
 		 	    //fs.unlinkSync(tmp_path); 
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
			            		//res.render('admin/entity/add', {sucess:rst,name:'entity'});
			            		}
			            }
			        });
					}
				});
	 	
	    
	    
    	

    });

};
