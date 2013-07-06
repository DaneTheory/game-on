'use strict';

app.controller('MatchCollectionCtrl', function ($scope, MatchModel) {

	$scope.MatchModel = MatchModel;

	$scope.getCollection = function() {
		MatchModel.getCollection();
	};

});