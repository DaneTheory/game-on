app.controller('UsersCtrl', function ($scope, $http, $location) {
	
	$scope.users;

	//http://secret-gorge-4002.herokuapp.com/

	$scope.init = function(){
		$http.get('http://localhost:3000/users', {withCredentials: true})
			.success(function(data, status, headers, config){
				$scope.users = data;
			}).error(function(data, status, headers, config){
				$location.path('/');
			});
	};

});