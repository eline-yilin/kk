'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getProdctList = function  (data, callback){	
	var query = 'select p.*, i.url from product p LEFT JOIN product_img i on p.id = i.product_id';
	return base.query(query, callback);
}; 
	
var getProdctById = function  (id, callback){	
	var query = 'select * from product where id=' + id;
	return base.getOne(query, callback);	
}; 


var post = function  (data, callback){
	var query = "insert into product (category_id,name,price) values (" +　 data['category'] + ",'"
	+ data['productname'] + "','" + data['price'] + "')";

	return base.query(query, function(err, rst){
		if(err){
			throw err;
		}
		else{
			var pid = rst['insertId'];
			var insert_img_query = "insert into product_img (product_id, url) values ";
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
this.get = getProdctList;
this.id = getProdctById;
this.post = post;
};

