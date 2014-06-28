'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];
var dbconfig = {"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	}

var getProdctList = function  (data, callback){	
	var connection = mysql.createConnection(dbconfig);
	connection.connect(function(err) {
	  if(!err){
		  connection.query('select * from product', function(err, result) {
		        if(!err){
		        	connection.end();
		           return callback(null,result);
		        }
		        else{
		        	console.log(err);
		        	return callback(err,null);
		        	}    
			}
			);
      }
      else{
      	console.log(err);
      	return callback(err,null);
      	}
	});
//	var rst = [
//		        {name:1,
//		        	id:2}
//		        ];
//	console.log(rst);
//	return rst;
	}; 
	
	var getProdctById = function  (id, callback){	
		var connection = mysql.createConnection(dbconfig);
		connection.connect(function(err) {
		  if(!err){
			  connection.query('select * from product where id=' + id , function(err, result) {
			        if(!err){
			        	if(result)
			        		{
			        		result = result[0];
			        		}
			        	else
			        		{
			        		result = null;
			        		}
			        	connection.end();
			           return callback(null,result);
			        }
			        else{
			        	console.log(err);
			        	return callback(err,null);
			        	}    
				}
				);
	      }
	      else{
	      	console.log(err);
	      	return callback(err,null);
	      	}
		});
//		var rst = [
//			        {name:1,
//			        	id:2}
//			        ];
//		console.log(rst);
//		return rst;
		}; 
	
module.exports = function(){
this.get = getProdctList;
this.id = getProdctById
};

