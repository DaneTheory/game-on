//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('GameCreateCtrl',
	function ($scope, $location, AuthenticationService, GeolocationHelper, GameService, VenueService) {

	$scope.AuthenticationService = AuthenticationService;
	$scope.VenueService = VenueService;
	$scope.GameService = GameService;

	$scope.isFormValid = false;

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

	$scope.setVenue = function (marker) {
		$scope.$apply(function(){
			$scope.game.venue = marker;
		});
	};

	$scope.create = function (game) {
		GameService.create(game).then(function () {
			$location.path('/player/' + AuthenticationService.player.id);
		});
	};

	$scope.venueMaxDistance = 10; // Km
	$scope.currentCoordinates;

	GeolocationHelper.getGeoLocation().then(function (location) {
		$scope.currentCoordinates = [
			location.coords.latitude,
			location.coords.longitude
		];

		VenueService.getVenuesByCoordinates(location.coords, $scope.venueMaxDistance).then(function (data) {
			$scope.VenueService.venues = data;
		});
	});

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