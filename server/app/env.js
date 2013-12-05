module.exports = function() {
	var env = {
		'development': {
			'facebook-oauth-key': '190931494431485',
			'facebook-oauth-secret': 'dac40e563502f5179a3e3bc852f6b364',
			'twitter-oauth-key': 'VfE0QYaKm2OcxXC1hXI7hg',
			'twitter-oauth-secret': 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
			'github-oauth-key': '',
			'github-oauth-secret': '',

			'client-url-cors': 'http://localhost:9000'
		}, 
		'production': {
			'facebook-oauth-key': '',
			'facebook-oauth-secret': '',
			'twitter-oauth-key': '',
			'twitter-oauth-secret': '',
			'github-oauth-key': '',
			'github-oauth-secret': '',

			'client-url-cors': ''
		}
	};

	var node_env = process.env.NODE_ENV || 'development';

	return env[node_env];
};