'use strict'; 

var BaseController = require("./Base");
var base = new BaseController();
var getItemList = function  (data,callback){
	var query = 'select * from news ';
	if(data)
		{
		query += ' where true ';
		for(var key in data){
            var attrName = key;
            var attrValue = data[key];
            query += ' and ' +　attrName + '=' + attrValue;
        }
		query += ' ORDER BY weight,updated DESC';
	}	
	return base.query(query,callback);

	}; 
	
	var addItem = function  (data,callback){
		var columns = [];
		var values = [];
		for(var key in data)
		{
			columns.push(key);
		}
		var query = "insert into news (" + columns.join() + ") values (";
		for(var key in data)
		{
			query += "'" + data[key] + "',";
		}
		query = query.substring(0,query.length -1);
		query += ")";
		console.log(query);
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getItemList;
this.post = addItem;
};