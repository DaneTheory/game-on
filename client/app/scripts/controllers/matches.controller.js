app.controller('MatchesController', function ($scope, $http, $location) {

	'use strict';

	$scope.model = {};

	$scope.init = function(){

		$http.get('http://localhost:3000/api/v1/match?populate=venue,players', { withCredentials: true })
			.success(function(data){
				$scope.model.matches = data.payload;
			});

	};

});