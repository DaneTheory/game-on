//
// # Authentication Service
// Stores the current session information.
// Uses Angular's `$cookieStore` to remember the session.
// 
// 2013 Pablo De Nadai
//

'use strict';

app.service('AuthenticationService', function ($http, $cookieStore, ApiUrl) {

	// Retrive Player's information from the cookies - if available.
	this.player = $cookieStore.get('player'); 
	this.errorMessage = null;

	return {
		player: this.player,
		errorMessage: this.errorMessage,

		signIn: function (email, password) {
			return $http.post(ApiUrl + '/auth/signin', {
				email: email,
				password: password
			});
		},

		signUp: function (email, password, name) {
			return $http.post(ApiUrl + '/auth/signup', {
				email: email,
				password: password,
				name: name,
			});
		},

		requestToken: function (action, provider) {
			return $http.get(ApiUrl + '/auth/' + action + '/' + provider);
		},

		validateToken: function (params) {
			var action = params.action,
				provider = params.provider;

			return $http.get(ApiUrl + '/auth/' + action + '/' + provider + '/callback', {
				params: params
			});
		},

		isSignedIn: function() {
			return !!this.player;
		},

		//
		// ### function getPath ()
		// Returns the main route for the current player.
		//
		getPath: function() {
			return '/player/' + this.player.id;
		},

		setPlayer: function(player) {
			this.errorMessage = null;
			this.player = player;
			$cookieStore.put('player', player);
		},

		removePlayer: function() {
			this.player = null;
			$cookieStore.remove('player');
		},
	};

});