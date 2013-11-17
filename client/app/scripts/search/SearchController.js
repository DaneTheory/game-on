//
//
//

'use strict';

app.controller('SearchCtrl', function ($scope, $location, $routeParams, ApiUrl) {

	$scope.search = $location.search();

	$scope.near = function () {
		$http.get(ApiUrl + '/search/near', {

		})
		.success(angular.bind(function (data) {

		}))
		.error(angular.bind(function () {

		}));
	};

	$scope.games = function () {

	};

	$scope.people = function () {

	};

	$scope.venue = function () {

	};

});