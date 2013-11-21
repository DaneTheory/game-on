//
//
//

'use strict';

app.controller('SearchCtrl', function ($scope, $location, $routeParams, $http, $q, ApiUrl, GeolocationHelper) {

	$scope.maxDistance = 10; // 10km
	$scope.searchTerm = '';

	$scope.searchResults = [];
	
	$scope.search = function (searchTerm) {
		console.log('Geolocating...');

		$scope.searchTerm = searchTerm;

		GeolocationHelper.getGeoLocation().then(function (location) {
			console.log('Geolocated.');
			console.log('Searching...');

			$http.get(ApiUrl + '/search/near', {
				params: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					maxDistance: $scope.maxDistance,
					term: searchTerm
				}
			})
			.success(angular.bind($scope, function (data) {
				console.log('Success.', data);

				this.searchResults = data;
			}))
			.error(angular.bind($scope, function (data) {
				console.log('Error.', data);

				this.searchResults = [];
			}));
		});
	};

	$scope.getDistance = function (coordinatesTo) {
		var deferred = $q.defer();

		GeolocationHelper.getGeoLocation().then(function (location) {
			var coordinatesFrom = [
				location.coords.latitude,
				location.coords.longitude
			];

			var distance = GeolocationHelper.getDistanceFromCoordinates(coordinatesFrom, coordinatesTo);

			deferred.resolve(distance);
		});

		return deferred.promise;
	}

	$scope.$on('$routeUpdate', function () {
		$scope.init();
	});

	$scope.init = function () {
		$scope.search($location.search().term);
	};

	$scope.init();

});