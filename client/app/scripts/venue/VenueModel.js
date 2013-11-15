//
//
//

'use strict';

app.factory('VenueModel', function ($http, ApiUrl) {

	this.collection = null;
	this.venue = {
		name: null,
		location: null
	};

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

	return this;

});