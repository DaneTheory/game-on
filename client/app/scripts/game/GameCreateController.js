//
// Game Create Controller
// Controller for the `Start a game` view.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('GameCreateCtrl',
	function ($scope, $location, AuthenticationService, GeolocationHelper, GameService, VenueService) {

	$scope.AuthenticationService = AuthenticationService;
	$scope.VenueService = VenueService;
	$scope.GameService = GameService;

	// Used to enable/disable the "Start" button.
	// Returns `true` if all fields have been filled.
	$scope.isFormValid = false;

	// Holds the game information.
	$scope.game = {
		description: null,
		gender: null,
		venue: null,
		price: null,
		when: null,
		maxPlayers: null
	};

	$scope.activeTab = 0;
	$scope.tabs = [
		{ label: 'Title', icons: [ 'fa-tag' ] },
		{ label: 'Gender', icons: [ 'fa-male', 'fa-female' ] },
		{ label: 'Venue', icons: [ 'fa-map-marker' ] },
		{ label: 'Price', icons: [ 'fa-dollar' ] },
		{ label: 'Date', icons: [ 'fa-calendar' ] },
		{ label: 'Size', icons: [ 'fa-users' ] }
	];
	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	// Map marker click handler.
	$scope.setVenue = function (marker) {
		$scope.$apply(function(){
			$scope.game.venue = marker;
		});
	};

	// `Start` button click handler.
	$scope.create = function (game) {
		GameService.create(game).then(function () {
			$location.path('/player/' + AuthenticationService.player.id);
		});
	};

	// Search for venues within 10 km distance.
	$scope.venueMaxDistance = 10; // Km
	$scope.currentCoordinates;

	// Load the current location and populate the venues.
	GeolocationHelper.getGeoLocation().then(function (location) {
		$scope.currentCoordinates = [
			location.coords.latitude,
			location.coords.longitude
		];

		VenueService.getVenuesByCoordinates(location.coords, $scope.venueMaxDistance).then(function (data) {
			$scope.VenueService.venues = data;
		});
	});

	// Update the `isFormValid` value as the user inputs values.
	$scope.$watch('game', function(properties) {
		var isFormValid = true;

		for (var property in properties) {
			if ($scope.$eval('game.' + property) === null) {
				isFormValid = false;
			}
		}

		$scope.isFormValid = isFormValid;
	}, true);

});