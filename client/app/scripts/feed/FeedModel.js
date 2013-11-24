//
//
//

app.service('FeedModel', function ($http, $q, CacheHelper, AuthenticationModel, ApiUrl) {

    var feeds = [];

    return {
        feeds: feeds,

        getFeeds: function () {
            var deferred = $q.defer();

            // TODO: Do it in a way where the result is always related to the user signed in.
            var playerId = AuthenticationModel.player.id;

            
            if (CacheHelper.get('feed')) {
                deferred.resolve(CacheHelper.get('feed'));
            } else {
                $http.get(ApiUrl + '/feed/finder/player/' + playerId, {
                    params: {
                        populate: 'match,meta.createdBy',
                        limit: 10
                    }
                })
                .success(function (data) {
                    deferred.resolve(CacheHelper.put('feed', data.payload));
                })
                .error(function () {
                    deferred.resolve(CacheHelper.put('feed', null));
                });
            }

            return deferred.promise;
        }
    };
});