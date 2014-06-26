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
	
	var post = function  (data,callback){	
		var connection = mysql.createConnection({"user": db['user'],
		    "password": db['password'],
		    "host": db['host'],
		    "database": db['database']
		});
		var query = "";
		if(data && data['id'])
			{
			
			}
		else
			{
			query = "INSERT INTO USER (name,openid,gender,birthday,clientid) values" +
					"('" + data['username'] 
			+ "','abcd','"
			+ data['gender'] + "','" 
			+ data['birthday'] + "',1)";
			}
		connection.connect(function(err) {
		  if(!err){
			  console.log(query);
			  connection.query(query, function(err, result) {
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
this.post = post;
};