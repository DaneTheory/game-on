module.exports = function() {
	var env = {
		'development': {
			'facebook-oauth-key': '',
			'facebook-oauth-secret': '',

			'client-url-cors': 'http://192.168.20.102:9000'
		}, 
		'production': {
			'facebook-oauth-key': '',
			'facebook-oauth-secret': '',

			'client-url-cors': ''
		}
	};

	var node_env = process.env.NODE_ENV || 'development';

	return env[node_env];
};