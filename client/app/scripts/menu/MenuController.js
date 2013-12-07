//
// # Menu Controller
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('MenuCtrl', function ($scope, $location, $http, ApiUrl, AuthenticationService) {

	$scope.AuthenticationService = AuthenticationService;

	//
	// ### function signOut ()
	// Closes the session and remove the player from the cookies.
	//
	$scope.signOut = function () {
		AuthenticationService.removePlayer();
		$location.path('/');
		return $http.get(ApiUrl + '/auth/signout');
	};

});