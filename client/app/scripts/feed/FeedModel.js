//
//
//

app.service('FeedModel', function ($http, $q, CacheHelper, AuthenticationModel, ApiUrl) {

    return {
        getList: function () {
            // TODO: Do it in a way where the result is always related to the user signed in.
            var playerId = AuthenticationModel.player.id;

            var deferred = $q.defer();

            if (CacheHelper.get(playerId)) {
                deferred.resolve(CacheHelper.get(playerId));
            } else {
                $http.get(ApiUrl + '/feed/finder/player/' + playerId, {
                    params: {
                        populate: 'match,meta.createdBy'
                    }
                })
                .success(function (data) {
                    deferred.resolve(CacheHelper.put(playerId, data.payload));
                })
                .error(function () {
                    deferred.resolve(CacheHelper.put(playerId, null));
                });
            }

            return deferred.promise;
        }
    };
});