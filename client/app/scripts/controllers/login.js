'use strict';

app.controller('LoginController', function ($scope, $http, $location) {

	$scope.username = 'johnny';
	$scope.password = 'johnny';
	$scope.err = '';

	$scope.login = function(){

		$http({
			method: 'POST', 
			url: 'http://localhost:3000/login', 
			withCredentials: true,
			data: {
				'username': $scope.username,
				'password': $scope.password
			}
		}).success(function(data, status, headers, config){
			$location.path('/player');
		}).error(function(data, status, headers, config){
			$scope.err = data;
		});

	};

});