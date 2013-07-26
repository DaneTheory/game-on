var env = require('./../env')();

exports = module.exports = function(app) {

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', env['client-url-cors']);
		res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
	});

	app.options('*', function(req, res){
		res.send(200); 
	});

}