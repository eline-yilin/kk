'use strict';

module.exports = function(router) {

	router.get('/', function(req, res) {
		var openid = req.query.openid || (req.cookies && req.cookies.openid);
		var UserModel = require('../../models/user');
		var model = new UserModel();
		model.openid(openid,function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						res.json(rst);
					},
					html : function() {
						console.log('////' + JSON.stringify(rst));
						res.render('user/index', {
							user : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});

	router.get('/credit', function(req, res) {
		var uid = req.cookies && req.cookies.uid;
		var CreditModel = require('../../models/credit');
		var model = new CreditModel();
		model.get({userid:uid},function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						res.json(rst);
					},
					html : function() {
						console.log('////' + JSON.stringify(rst));
						res.render('user/credit', {
							credits : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});

	router.get('/register', function(req, res) {
		//console.log('#########################' + JSON.stringify(req.query));
		//console.log('#########################' + JSON.stringify(req.url));
		//console.log('#########################' + JSON.stringify(req.method));
		var openid = req.query.openid;
		if (!openid ||openid == 'undefined') {
			console.log('no openid');
			res.redirect('/errors/404');
		} else {
			console.log(openid + '////');
			res.cookie('openid', openid);

			var years = new Array();
			var months = new Array();
			var days = new Array();
			for ( var i = 1970; i < 2014; i++) {
				years.push({
					value : i,
					key : i
				});
			}
			for ( var i = 1; i < 13; i++) {
				months.push({
					value : i,
					key : i
				});
			}
			for ( var i = 1; i < 32; i++) {
				days.push({
					value : i,
					key : i
				});
			}
			var rst = {
				years : years,
				months : months,
				days : days
			};
			res.format({
				json : function() {
					res.json(rst);
				},
				html : function() {
					res.render('user/register', {
						data : rst,
						name : 'user'
					});
				}
			});
		}
	});

	router.post('/register', function(req, res) {
		var UserModel = require('../../models/user');
		var model = new UserModel();

		model.post(req.body, function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						console.log('////#############//////'
								+ JSON.stringify(rst));
						res.cookie('uid', rst.insertId);
						res.json(rst);
					},
					html : function() {
						res.render('user/register', {
							credits : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});

};
