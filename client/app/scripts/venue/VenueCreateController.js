//
// # Venue Create Controller
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('VenueCreateCtrl', function ($scope, $location, AuthenticationService, GeolocationHelper, VenueService) {

	$scope.AuthenticationService = AuthenticationService;
	$scope.VenueService = VenueService;

	$scope.isFormValid = false;

	$scope.venue = {
		name: null,
		coordinates: null,
		location: null,
		address: null
	};

	$scope.activeTab = 0;
	$scope.tabs = [
		{ label: 'Name', icons: [ 'fa-tag' ] },
		{ label: 'Location', icons: [ 'fa-map-marker' ] },
		{ label: 'Address', icons: [ 'fa-globe' ] }
	];
	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	$scope.updateVenue = function (results, coordinates) {
		$scope.$apply(function(){
			$scope.venue.coordinates = coordinates;

			$scope.venue.location = results[4].formatted_address || '';
			$scope.venue.address = results[0].formatted_address || '';
		});
	};

	$scope.create = function (venue) {
		VenueService.create(venue).then(function () {
			$location.path('/player/' + AuthenticationService.player.id);
		});
	};

	$scope.currentCoordinates;

	GeolocationHelper.getGeoLocation().then(function (location) {
		$scope.currentCoordinates = [
			location.coords.latitude,
			location.coords.longitude
		];
	});

	$scope.$watch('venue', function(properties) {
		var isFormValid = true;

		for (var property in properties) {
			if ($scope.$eval('venue.' + property) === null) {
				isFormValid = false;
			}
		}

		$scope.isFormValid = isFormValid;
	}, true);

});