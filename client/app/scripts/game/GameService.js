//
// # Game Service
//
// 2013 Pablo De Nadai
//

'use strict';

app.service('GameService', function ($http, $q, ApiUrl) {

	this.game = {};

	return {
		game: this.game,

		//
		// ### function join (game)
		// #### @game {object} Game instance
		// Add the current player to the list for players.
		//
		join: function (game) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/game/' + game.id + '/join')
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function () {
					deferred.reject(null);
				});

			return deferred.promise;
		},

		//
		// ### function leave (game)
		// #### @game {object} Game instance
		// Remove the current player to the list for players.
		//
		leave: function (game) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/game/' + game.id + '/leave')
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject(null);
				});

			return deferred.promise;
		},

		// 
		// ### function create (game)
		// #### @game {object} Game instance
		// Post the new game information to the server.
		//
		create: function (game) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/game', game)
				.success(function () {
					deferred.resolve();
				})
				.error(function () {
					deferred.reject();
				});

			return deferred.promise;
		}
	};
});