//
// # Feed Service
//
// 2013 Pablo De Nadai
//

'use strict';

app.service('FeedService', function ($http, $q, CacheHelper, AuthenticationService, ApiUrl) {

	this.feeds = [];

	return {
		feeds: this.feeds,

		//
		// ### function getFeeds ()
		// Retrieves all the feeds available for the current user
		// Feeds are cached for better performance
		// Returns a promise.
		//
		getFeeds: function () {
			var deferred = $q.defer();

			if (CacheHelper.get('feed')) {
				deferred.resolve(CacheHelper.get('feed'));
			} else {
				$http.get(ApiUrl + '/feed')
					.success(function (data) {
						deferred.resolve(CacheHelper.put('feed', data));
					})
					.error(function () {
						deferred.reject(CacheHelper.remove('feed'));
					});
			}

			return deferred.promise;
		},

		//
		// ### function markAsRead (feed)
		// #### @feed {object} Feed instance
		// Mark a given feed as read.
		//
		markAsRead: function (feed) {
			feed.meta.readAt = new Date();

			$http.post(ApiUrl + '/feed/markAsRead/' + feed.id)
				.success(function () {
					// Do something ?
				})
				.error(function () {
					// Tell the user ?
				});
		},

		//
		// ### function markAllAsRead ()
		// Mark all feed items - for the current signed in user - as read.
		//
		markAllAsRead: function () {
			_.each(this.feeds, function (feed) {
				if (!feed.meta.readAt) {
					feed.meta.readAt = new Date();
				}
			});

			$http.post(ApiUrl + '/feed/markAsRead/all')
				.success(function () {
					// Do something ?
				})
				.error(function () {
					// Tell the user ?
				});
		}
	};
});