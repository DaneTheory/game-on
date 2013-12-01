//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('VenueNewCtrl', function ($scope, $location, AuthenticationModel, GeolocationHelper, MatchModel, VenueModel) {

	$scope.AuthenticationModel = AuthenticationModel;
	$scope.VenueModel = VenueModel;
	$scope.MatchModel = MatchModel;

	$scope.isFormValid = false;

	$scope.match = {
		description: null,
		gender: null,
		venue: null,
		price: null,
		when: null,
		maxPlayers: null
	};

	$scope.activeTab = 0;
	$scope.tabs = [
		{ label: 'Name', icons: [ 'fa-tag' ] },
		{ label: 'Coordinates', icons: [ 'fa-map-marker' ] },
		{ label: 'Location', icons: [ 'fa-globe' ] }
	];
	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	$scope.updateVenue = function (marker) {
		$scope.$apply(function(){
			$scope.match.venue = marker;
		})
	};

	$scope.create = function (match) {
		MatchModel.create(match).then(function () {
			$location.path('/player/' + AuthenticationModel.player.id);
		});
	}

	$scope.venueMaxDistance = 10; // Km
	$scope.currentCoordinates;

	GeolocationHelper.getGeoLocation().then(function (location) {
		$scope.currentCoordinates = [
			location.coords.latitude,
			location.coords.longitude
		];

		VenueModel.getVenuesByCoordinates(location.coords, $scope.venueMaxDistance).then(function (data) {
			$scope.VenueModel.venues = data;
		});
	});

	$scope.$watch('match', function(properties) {
		var isFormValid = true;

		for (var property in properties) {
			if ($scope.$eval('match.' + property) === null) {
				isFormValid = false;
			}
		}

		$scope.isFormValid = isFormValid;
	}, true);

});