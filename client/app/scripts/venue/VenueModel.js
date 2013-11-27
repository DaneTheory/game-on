//
//
//

'use strict';

app.service('VenueModel', function ($http, $q, CacheHelper, ApiUrl) {

	this.venues = [];

	return {
		venues: this.venues,

		getVenuesByCoordinates: function (coordinates, maxDistance) {
			var deferred = $q.defer();

			if (CacheHelper.get('venuesByCoordinates')) {
				deferred.resolve(CacheHelper.get('venuesByCoordinates'));
			} else {
				$http.get(ApiUrl + '/venue/finder/near', {
					params: {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						maxDistance: maxDistance || 10
					}
				})
				.success(function (data) {
					deferred.resolve(CacheHelper.put('venuesByCoordinates', data.payload));
				})
				.error(function () {
					deferred.resolve(CacheHelper.remove('venuesByCoordinates'));
				})
			}

			return deferred.promise;
		}
	}

	this.getById = function (venueId) {
		return $http.get(ApiUrl + '/venue/' + venueId)
			.success(angular.bind(this, function (data) {
				this.venue = data.payload[0];
				this.venue.id = this.venue._id;
			}))
			.error(angular.bind(this, function () {
				this.venue = null;
			}));
	};

	this.getCollection = function (params) {
		var defaultParams = {};

		var url = ApiUrl + '/venue';

		if (params && params.latitude && params.longitude && params.maxDistance) {
			url += '/finder/near';
			defaultParams = angular.extend(defaultParams, params);
		}

		return $http.get(url, {
				params: defaultParams
			})
			.success(angular.bind(this, function (data){
				this.collection = data.payload;
			}))
			.error(angular.bind(this, function(){
				this.collection = null;
			}));
	};


});