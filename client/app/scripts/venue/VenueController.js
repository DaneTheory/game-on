'use strict';

app.controller('VenueCtrl', function ($scope, $routeParams, VenueModel) {

	$scope.VenueModel = VenueModel;

	$scope.venueId = $routeParams.venueId;

	$scope.getById = function () {
		VenueModel.getById($scope.venueId);
	};

});