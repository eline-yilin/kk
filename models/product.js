'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];


var getProdctList = function  (callback){	
	var connection = mysql.createConnection({"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	});
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
	
module.exports = function(){console.log('prod mod exp');
this.get = getProdctList;
};

