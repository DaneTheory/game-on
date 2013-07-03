app.controller('PlayerController', function ($scope, $http, $location, $routeParams) {

	'use strict';

	$scope.player = null;

	$scope.init = function(){

		var playerId = $routeParams.playerId;

		$http.get('http://localhost:3000/api/v1/player/' + playerId, { withCredentials: true })
			.success(function(data){
				$scope.player = data.payload[0];
			});

	};

});