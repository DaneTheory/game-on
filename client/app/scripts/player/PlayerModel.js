//
//
//

'use strict';

app.service('PlayerModel', function ($http, $q, CacheHelper, ApiUrl) {

	this.player = {};

	return {
		player: this.player,

		getById: function (playerId) {
			var deferred = $q.defer();

			if (CacheHelper.get(playerId)) {
				deferred.resolve(CacheHelper.get(playerId));
			} else {
				$http.get(ApiUrl + '/player/' + playerId)
					.success(function (data) {
						deferred.resolve(CacheHelper.put(playerId, data));
					})
					.error(function () {
						deferred.resolve(CacheHelper.remove(playerId));
					});
			}

			return deferred.promise;
		}
	}

});