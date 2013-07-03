app.controller('VenuesController', function ($scope, $http, $location, $routeParams) {

	'use strict';

	$scope.model = {};

	$scope.init = function(){

		var latitude = $routeParams.lat;
		var longitude = $routeParams.lon;

		var location = '';
		if (latitude && longitude) {
			location = '/finder/near?location=' + latitude + ',' + longitude + '&maxDistance=100';
		}

		$http.get('http://localhost:3000/api/v1/venue' + location, { withCredentials: true })
			.success(function(data){
				$scope.model.venues = data.payload;
			});

	};

	$scope.getGeoLocation = function(){
		navigator.geolocation.getCurrentPosition(
			getGeoLocationSuccess,
			getGeoLocationError
		);
	};

	var getGeoLocationSuccess = function(location) {
		// See https://groups.google.com/forum/?fromgroups#!topic/angular/nFbtADyEHg8
		$scope.$apply(function() {
			$location.path('/venue/l/' + location.coords.latitude + '/' + location.coords.longitude);
		});
	};

	var getGeoLocationError = function(err) {
		console.log('location err', err);
	};

});