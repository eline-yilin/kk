'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];
var dbconfig = {"user": db['user'],
	    "password": db['password'],
	    "host": db['host'],
	    "database": db['database']
	};
var redis = require("redis");
var connect = cfg['redisconfig'];
var isRedis = connect['isRedis'];
var host = connect['host'] || '127.0.0.1';
var port = connect['port'] || '6379';
var option =  connect['option'] || {};
if(isRedis)
{
	var client = redis.createClient(port,host,option);
	
	client.on("error", function (err) {
	    console.log("Error " + err);
	});
}
var hashkey = 'basequery';
var query = function(query, callback){
	console.log(query);
	var results = null;
	if(isRedis)
	{
	  var results = client.hget(hashkey, query);
	  console.log('!!!!!!get  ' + results);
	}
	if(!results)
		{
			var connection = mysql.createConnection(dbconfig);
			connection.connect(function(err) {
			  if(!err){
				  connection.query(query, function(err, result) {
				        if(!err){
				        	connection.end();
				        	if(isRedis){
				        		client.hset(hashkey, query,result);
					        	console.log('!!!!!!set ' + result);
				        	}
				        	
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
		}
        
	
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

var processFilter = function(data){
	var query = '';
	if(data)
	{
		query += ' where true ';
		for(var key in data){
	        var attrName = key;
	        var attrValue = data[key];
	        query += ' and ' +　attrName + '=' + attrValue;
	    }
	}	
	return query;
}

var processInsertQuery = function(table, data)
{
	var query = '';
	var columns = [];
	var values = [];
	for(var key in data)
	{
		columns.push(key);
	}
	var query = "INSERT INTO " + table + " (" + columns.join() + ") values (";
	for(var key in data)
	{
		query += "'" + data[key] + "',";
	}
	query = query.substring(0,query.length -1);
	query += ")";
	return query;
};

var processUpdateQuery = function(table, data)
{
	var query = '';
	var id = 0;
	var query = "UPDATE  " + table + " SET " ;
	for(var key in data)
	{
		if(key == 'id')
		{
			id = data[key];
			continue;
		}
		query +=  key + "='" + data[key] + "',";
	}
	query = query.substring(0,query.length -1);
	query += " WHERE id=" + id;
	console.log(query);
	return query;
};
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
	this.processFilter = processFilter;
	this.processInsertQuery = processInsertQuery;
	this.processUpdateQuery = processUpdateQuery;
	
};