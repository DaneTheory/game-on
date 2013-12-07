//
// # Authentication Middleware
// Validade if user has access to the API.
//
// 2013 Pablo De Nadai
//

var _ = require('lodash');

exports = module.exports = function(app) {
	
	app.use(function (req, res, next) {
		
		// 
		// Ignore preflight CORS calls.
		// 
		if ('OPTIONS' === req.method) {
			return next();
		}
			
		// 	
		// If not authenticate, stop calls that isn't directed to `/auth/` or `/dev/`.
		// TODO: This looks a bit crappy.
		// 
		if (!req.session.passport.user) {
			if (!_.contains(req.url, '/auth/') && !_.contains(req.url, '/dev/')) {
				return res.send(401, 'You are not authorized to view this page.');
			}
		}

		return next();
	});

}