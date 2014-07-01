'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getCreditList = function  (data,callback){
	var query = 'select * from credit_history where userid=' + data['userid'];
	return base.query(query,callback);

	}; 
	
	var addCredit = function  (data,callback){	
		var query = "insert into credit_history ( typeid, expiration, amount, userid, client, updated) values ("
			  + data['typeid'] 
		  + ", '" + data['expiration'] + "',"
		  +  data['amount'] + ","
		  + data['userid'] + ","
		  + data['client'] + ",'"
		  + data['updated'] + "')";
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getCreditList;
this.post = addCredit;
};