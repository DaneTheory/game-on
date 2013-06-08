app.controller('VenuesController', function ($scope, $http, $location) {

	$scope.model = {};

	$scope.init = function(){

		$http.get('http://localhost:3000/api/v1/venue', { withCredentials: true })
			.success(function(data){
				$scope.model.venues = data.payload; 
			});

	};

});