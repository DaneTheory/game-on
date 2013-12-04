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
						deferred.reject(CacheHelper.remove(playerId));
					});
			}

			return deferred.promise;
		},

		update: function (player) {
			var deferred = $q.defer();

			$http.put(ApiUrl + '/player/' + player.id, player)
				.success(function (data){
					deferred.resolve(data);
				})
				.error(function(){
					deferred.reject();
				});

			return deferred.promise;
		}
	}

});