var env = require('./../env')();

exports = module.exports = function(app) {

	// 
	// Setup headers needed for CORS.
	// 
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', env['client-url-cors']);
		res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});

	// 
	// By-pass the preflight calls.
	// 
	app.options('*', function(req, res){
		res.send(200); 
	});

}