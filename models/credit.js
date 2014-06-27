'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];


var getCreditList = function  (data,callback){	
	var connection = mysql.createConnection({"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	});
	connection.connect(function(err) {
	  if(!err){
		  connection.query('select * from credit_history where userid=' + data['userid'], function(err, result) {
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

	}; 
	
module.exports = function(){
this.get = getCreditList;
};