'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];
var dbconfig = {"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	};

var query = function(query, callback){
	console.log(query);
	var connection = mysql.createConnection(dbconfig);
	connection.connect(function(err) {
	  if(!err){
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

var getOne = function(query, callback){
	var connection = mysql.createConnection(dbconfig);
	connection.connect(function(err) {
		if (!err) {
			connection.query(query,
					function(err, result) {
						if (!err ) {
							connection.end();
							var rst = result ? result[0] : null;
							return callback(null, rst);
						} else {
							console.log(err);
							return callback(err, null);
						}
					});
		} else {
			console.log(err);
			return callback(err, null);
		}
	});
}

module.exports = function(){
	this.extend = function(child){
		var source = child();
		//base function
		source.common = function(){console.log('common');}
		return function(){ 
		return source;
		};
	};
	this.query = query;
	this.getOne = getOne;
};