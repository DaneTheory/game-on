exports = module.exports = function(app) {
	app.post('/login', require('./views/login.view').init);
	app.get('/logout', require('./views/logout.view').init);
	app.get('/fixtures', require('./views/fixtures.view').init);
};