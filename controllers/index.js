'use strict';


var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();


    router.get('/', function (req, res) {
    	var locale = 'en-US';
    	if(typeof  req.cookies.locale !== undefined &&  req.cookies.locale  )
    		{
    		
    		locale = req.cookies.locale;
    		}
    	console.log(locale);
    	res.locals.context = {
                locality: locale
            };
        res.render('index', model);
        
    });
    
    router.get('/setLanguage/:locale', function (req, res) {
        res.cookie('locale', req.params.locale);
        res.redirect('/');
    });
};
