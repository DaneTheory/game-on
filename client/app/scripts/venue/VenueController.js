//
//
//

'use strict';

app.controller('VenueCtrl', function ($scope, $routeParams, $location, VenueModel, GeolocationHelper) {

	$scope.VenueModel = VenueModel;

	$scope.venueId = $routeParams.venueId;
	$scope.latitude = $routeParams.latitude;
	$scope.longitude = $routeParams.longitude;
	$scope.maxDistance = 100; // Km

	$scope.getById = function () {
		VenueModel.getById($scope.venueId);
	};

	$scope.getCollection = function () {
		VenueModel.getCollection({
			latitude: $scope.latitude,
			longitude: $scope.longitude,
			maxDistance: $scope.maxDistance
		});
	};

	$scope.getGeoLocation = function(){
		$scope.geoLocation = GeolocationHelper.getGeoLocation();
		$scope.geoLocation.then(getGeoLocationSuccess);
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

});