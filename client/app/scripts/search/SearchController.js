//
//
//

'use strict';

app.controller('SearchCtrl', function ($scope, $location, $routeParams, $http, ApiUrl, GeolocationHelper) {

	$scope.maxDistance = 500000; // 5km
	$scope.searchType = 'near';
	$scope.searchTerm = '';

	$scope.searchResults = [];
	
	$scope.searchTypes = {
		'near': 'Near',
		'player': 'Player',
		'venue': 'Venue',
		'match': 'Match'
	}

	$scope.search = function (searchType, searchTerm) {
		console.log('Geolocating...');

		$scope.searchType = searchType;
		$scope.searchTerm = searchTerm;

		GeolocationHelper.getGeoLocation().then(function (location) {
			console.log('Geolocated.');
			console.log('Searching...');

			$http.get(ApiUrl + '/search/' + searchType, {
				params: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					maxDistance: $scope.maxDistance,
					term: searchTerm
				}
			})
			.success(angular.bind($scope, function (data) {
				this.searchResults = data;
				console.log('Success.', data);
			}))
			.error(angular.bind($scope, function (data) {
				this.searchResults = [];
				console.log('Error.', data);
			}));
		});
	};

	$scope.$on('$routeUpdate', function () {
		$scope.init();
	});

	$scope.init = function () {
		var search = $location.search(),
			term = search ? search.term : null;

		$scope.search($scope.searchType, term);
	};

	$scope.init();

});