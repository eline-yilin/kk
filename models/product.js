'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getProdctList = function  (data, callback){	
	var query = 'select * from product';
	return base.query(query, callback);
}; 
	
var getProdctById = function  (id, callback){	
	var query = 'select * from product where id=' + id;
	return base.getOne(query, callback);	
}; 
	
module.exports = function(){
this.get = getProdctList;
this.id = getProdctById
};

