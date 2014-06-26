'use strict';
module.exports = function() {
	return function(req, res, next) {
		var url = req.url;
		var openid = req.query.openid || (req.cookies && req.cookies.openid);
		var uid = req.cookies && req.cookies.uid;
		var method = req.method;
		//not in error page
		if (url.indexOf('errors/') < 0) {
			//in register
			if(method.toLowerCase() == 'get' && url.indexOf('user/register') >= 0)
					{
						if (!openid) {
							console.log('in auth//');
							res.redirect('/errors/404');
						}
						else
							{
							next();
							}
					}
			//in other pages
			 else {
				console.log('in auth//' + openid);
				
				if (!uid) {
					res.redirect('/user/register?openid=' + openid);
				}
				else{
					next();
				}
			}
		}
		else
			{
			next();
			}

	};
};