'use strict';
var mysql = require('mysql');


var getProdctList = function  (callback){	
	var connection = mysql.createConnection({"user": "root",
	    "password": "goumao",
	    "host": "localhost",
	    "database": "yuechang"
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

