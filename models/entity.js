'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getEntityList = function  (data, callback){	
	var query = 'select p.*, i.url from entity p LEFT JOIN product_img i on p.id = i.product_id';
	return base.query(query, callback);
}; 


var getEntityById = function  (id, callback){	
	var query = 'select * from entity where id=' + id;
	return base.getOne(query, callback);	
}; 


var post = function  (data, callback){
	var query = "insert into entity (category_id,name) values (" +　 data['category'] + ",'"
	+ data['entityname'] + "')";

	return base.query(query, function(err, rst){
		if(err){
			throw err;
		}
		else{
			var pid = rst['insertId'];
			var insert_img_query = "insert into entity_img (entity_id, url) values ";
			var imgs = data['img'];
			for(var i = 0; i <  imgs.length; i++)
			{
				insert_img_query += "(" + pid + ",'" + imgs[i] + "')";
				if(i != (imgs.length - 1) )
					{
					insert_img_query += ",";
					}
			}
			return base.query(insert_img_query, callback);
		}
	});	
}; 
	
module.exports = function(){
this.get = getEntityList;
this.id = getEntityById;
this.post = post;
};
