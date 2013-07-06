'use strict';

app.controller('MenuCtrl', function ($scope, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signOut = function(){
		AuthenticationModel.signOut();
	};

});