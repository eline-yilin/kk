'use strict';
module.exports = function() {
	return function(req, res, next) {
		var url = req.url;
		var openid = req.query.openid || (req.cookies && req.cookies.openid);
		if(openid){
			res.cookie('openid',openid);
		}
		var uid = req.cookies && req.cookies.uid;
		var method = req.method;
		
		// not in error page
		if (url.indexOf('errors/') < 0) {
			if (!openid) {
				console.log('in auth//');
				res.redirect('/errors/404');
			} else {
				// in register
				if (method.toLowerCase() == 'get'
						&& url.indexOf('user/register') >= 0) {
					next();
				}

				// in other pages
				else {
					console.log('in auth//' + openid);
					if (!uid) {
						var UserModel = require('../models/user');
						var model = new UserModel();
						model.openid(openid,
								function(err, rst) {
							if (err) {
								console.log(err);
							} else {
								res.format({
									json : function() {
										console
										.log('json:'+ JSON.stringify(rst));
										next();
									},
									html : function() {
										if (rst) {
											uid = rst['id'];
											res.cookie('uid',uid);
											next();
											console.log('////' + JSON.stringify(rst));
										} else {
											res.redirect('/user/register?openid='
													+ openid);
										}

									}
								});
							}
						});
					} else {
						next();
					}
				}
			}
		} else {
			next();
		}

	};
};