'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];


var getUserList = function  (callback){	
	var connection = mysql.createConnection({"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	});
	connection.connect(function(err) {
	  if(!err){
		  connection.query('select * from user limit 1', function(err, result) {
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
this.get = getUserList;
};