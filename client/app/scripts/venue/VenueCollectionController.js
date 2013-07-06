'use strict';

app.controller('VenueCollectionCtrl', function ($scope, $location, $routeParams, VenueModel) {

	$scope.VenueModel = VenueModel;

	$scope.latitude = $routeParams.latitude;
	$scope.longitude = $routeParams.longitude;
	$scope.maxDistance = 100; // Km

	$scope.getCollection = function () {
		VenueModel.getCollection({
			latitude: $scope.latitude,
			longitude: $scope.longitude,
			maxDistance: $scope.maxDistance
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
			$location.search({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
		});
	};

	var getGeoLocationError = function(err) {
		console.log('[getGeoLocationError] err', err);
	};

});