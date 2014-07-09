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
	}	
	return base.query(query,callback);

	}; 
	
	var addItem = function  (data,callback){	
		var query = "insert into news ( status_id, title, content, user_id, target_type, updated， url, img) values ("
			  + data['status_id'] 
		  + ", '" + data['title'] + "','"
		  +  data['content'] + "',"
		  + data['user_id'] + ",'"
		  + data['target_type'] + "','"
		  + data['updated'] + "',"
		  + data['url'] + "',"
		  + data['img'] + "',"
		  + "')";
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getItemList;
this.post = addItem;
};