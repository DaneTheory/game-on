'use strict';

app.controller('MatchCollectionCtrl', function ($scope, MatchModel, MatchService) {

	$scope.MatchModel = MatchModel;

	$scope.getCollection = function() {
		MatchService.getCollection();
	};

});