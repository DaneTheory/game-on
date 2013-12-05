//
//
//

'use strict';

app.service('MatchModel', function ($http, $q, ApiUrl) {

	this.match = {};

	return {
		match: this.match,

		join: function (match) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/match/' + match.id + '/join')
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function () {
					deferred.reject(null);
				});

			return deferred.promise;
		},

		leave: function (match) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/match/' + match.id + '/leave')
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject(null);
				});

			return deferred.promise;
		},

		create: function (match) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/match', match)
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