//
//
//

'use strict';

app.factory('AuthenticationModel', function ($http, $cookieStore) {

	this.player = $cookieStore.get('player');
	this.errorStatus = null;

	this.isSignedIn = function() {
		return !!this.player;
	};

	this.getPath = function() {
		return '/player/' + this.player.id;
	};

	this.setPlayer = function(player) {
		this.errorStatus = null;
		this.player = player;
		$cookieStore.put('player', player);
	};

	this.removePlayer = function() {
		this.player = null;
		$cookieStore.remove('player');
	};

	return this;

});