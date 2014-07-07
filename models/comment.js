'use strict';

var BaseController = require("./Base");
var base = new BaseController();
var getCommentList = function  (data,callback){
	var query = 'select * from comment ';
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
	
	var addComment = function  (data,callback){	
		var query = "insert into comment ( status_id, title, content, user_id, target_type, updated) values ("
			  + data['status_id'] 
		  + ", '" + data['title'] + "','"
		  +  data['content'] + "',"
		  + data['user_id'] + ",'"
		  + data['target_type'] + "','"
		  + data['updated'] + "')";
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getCommentList;
this.post = addComment;
};