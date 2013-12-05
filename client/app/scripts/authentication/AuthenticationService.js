//
//
//

'use strict';

app.service('AuthenticationService', function ($http, $cookieStore) {

	this.player = $cookieStore.get('player');
	this.errorMessage = null;

	return {
		player: this.player,
		errorMessage: this.errorMessage,

		isSignedIn: function() {
			return !!this.player;
		},

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