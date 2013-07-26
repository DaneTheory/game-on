module.exports = function() {
	var env = {
		'development': {
			'facebook-oauth-key': '359014320866601',
			'facebook-oauth-secret': 'dbd46c18e7cf3b71099d43ad4b08a3e4',

			'client-url-cors': 'http://localhost:9000'
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