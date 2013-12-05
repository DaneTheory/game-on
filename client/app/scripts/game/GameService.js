//
//
//

'use strict';

app.service('GameService', function ($http, $q, ApiUrl) {

	this.game = {};

	return {
		game: this.game,

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