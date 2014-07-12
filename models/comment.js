'use strict';

var BaseController = require("./Base");
var base = new BaseController();
var getCommentList = function  (data,callback){
	var query = 'select * from comment ';
	query += base.processFilter(data);
	
	return base.query(query,callback);

	}; 
	
	var addComment = function  (data,callback){	
		var query = base.processInsertQuery('comment', data);
		
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getCommentList;
this.post = addComment;
};