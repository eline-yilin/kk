'use strict';


var EntityModel = require('../../models/entity');


module.exports = function (router) {

    var model = new EntityModel();


    router.get('/', function (req, res) {
    	var reqBody = {};
        if(req.query.floor)
        	{
        	reqBody.floor = req.query.floor;
        	
        	}
        if(req.query.category)
    	{
    	reqBody.category = req.query.category;
    	
    	}
    	model.get
    	(reqBody,
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{

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
				var ret = [];
				for(var key in temp)
					{
					if(temp[key])
						{
						ret.push(temp[key]);
						}
					}
                res.render('entity/index', {items:ret,name:'entity'});
            
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
				console.log(rst);
				if(rst.imgs)
					{
					for(var key in rst.imgs)
					{
						var item = rst.imgs[key];
						var url = item.url;
						url = url.replace(".build", "");
						rst.imgs[key].url = url;

					}
			    }
                res.render('entity/id', {items:rst,name:'entity'});
				}
			}
  	);
});

};
