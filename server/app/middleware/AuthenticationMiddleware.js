var _ = require('lodash');

exports = module.exports = function(app) {
	
	app.use(function (req, res, next) {
		if ('OPTIONS' === req.method) {
			next();
		} else if (!req.session.username) {
			if (!_.contains(req.url, '/auth/') && !_.contains(req.url, '/dev/')) {
				res.send(401, 'You are not authorized to view this page.');
			}
		} else {
			next();
		}
	});

}