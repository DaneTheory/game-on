app.controller('PlayersController', function ($scope, $http, $location) {

	'use strict';

	$scope.players = null;

	//http://secret-gorge-4002.herokuapp.com/

	$scope.init = function(){
		$http.get('http://localhost:3000/api/v1/player', { withCredentials: true })
			.success(function(data, status, headers, config){
				$scope.players = data.payload;
			}).error(function(data, status, headers, config){
				$location.path('/');
			});
	};

});