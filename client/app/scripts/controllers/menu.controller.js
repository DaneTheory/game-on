app.controller('MenuController', function ($scope, AuthService) {

	$scope.AuthService = AuthService;
	
	$scope.logout = function(){
		AuthService.logout();
	};

});