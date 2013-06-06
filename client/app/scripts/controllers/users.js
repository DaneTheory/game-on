app.controller('UsersCtrl', function ($scope, $http, $location) {
	
	$scope.users;

	//http://secret-gorge-4002.herokuapp.com/

	$scope.init = function(){
		$http.get('http://localhost:3000/rest/player', {withCredentials: true})
			.success(function(data, status, headers, config){
				$scope.users = data.payload;
			}).error(function(data, status, headers, config){
				$location.path('/');
			});
	};

});