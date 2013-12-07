//
// # Redirect Middleware
//
// 2013 Pablo De Nadai
//

exports = module.exports = function(app) {
	
	// 
	// Overrides the `res.redirect` function
	// because CORS doens't play nice with redirects. :-(
	// 
	app.use(function(req, res, next){
		res.redirect = function(url) {
			res.send(200, url);
		};

		next();
	});

}