'use strict';
var mysql = require('mysql');
var cfg = require("config");
var db = cfg['databaseConfig'];
var dbconfig = {
		"user" : db['user'],
		"password" : db['password'],
		"host" : db['host'],
		"database" : db['database']
	}
var getUserList = function(callback) {
	var connection = mysql.createConnection(dbconfig);
	connection.connect(function(err) {
		if (!err) {
			connection.query('select * from user limit 1',
					function(err, result) {
						if (!err) {
							connection.end();
							return callback(null, result);
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

};

var getByOpenID = function(openid,callback) {
	var connection = mysql.createConnection(dbconfig);
	connection.connect(function(err) {
		if (!err) {
			connection.query("select * from user where openid = '" + openid + "' limit 1",
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

};

var post = function(data, callback) {
	var connection = mysql.createConnection(dbconfig);
	var query = "";
	if (data && data['id']) {

	} else {
		query = "INSERT INTO user (name,phone,openid,gender,birthday,clientid) values"
				+ "('"
				+ data['username']
				+ "','" + data['phone']
				+ "','"+ data['openid'] + "','"
				+ data['gender']
				+ "','" + data['birthday'] + "',1)";
		console.log(query);
	}
	connection.connect(function(err) {
		if (!err) {
			console.log(query);
			connection.query(query, function(err, result) {
				if (!err) {
					connection.end();
					return callback(null, result);
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

};

module.exports = function() {
	this.get = getUserList;
	this.post = post;
	this.openid = getByOpenID;
};