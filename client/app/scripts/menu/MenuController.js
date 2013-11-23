//
//
//

'use strict';

app.controller('MenuCtrl', function ($scope, $location, $http, ApiUrl, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signOut = function () {
		AuthenticationModel.removePlayer();
		$location.path('/');
		return $http.get(ApiUrl + '/auth/signout');
	};

});