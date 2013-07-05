'use strict';

app.factory('VenueService', function ($http, API_URL, VenueModel) {

	this.getById = function (venueId) {
		return $http.get(API_URL + '/venue/' + venueId)
			.success(function (data) {
				VenueModel.venue = data.payload[0];
			})
			.error(function () {
				VenueModel.venue = null;
			});
	};

	// Move me to a service.
	var serialize = function (obj) {
		var str = [];
		for (var p in obj) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
		return str.join('&');
	};

	this.getCollection = function (options) {

		var url = API_URL + '/venue';

		if (options.latitude && options.longitude && options.maxDistance) {
			url += '/finder/near?' + serialize(options);
		}

		return $http.get(url)
			.success(function(data){
				VenueModel.collection = data.payload;
			})
			.error(function(){
				VenueModel.collection = null;
			});
	};

	return this;

});