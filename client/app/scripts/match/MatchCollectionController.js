'use strict';

app.controller('MatchCollectionCtrl', function ($scope, MatchModel) {

	$scope.MatchModel = MatchModel;

	$scope.getCollection = function() {
		MatchModel.getCollection();
	};

	$scope.join = function (matchId) {
		MatchModel.join(matchId);
	};

});