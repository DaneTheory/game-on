//
//
//

'use strict';

app.controller('PlayerEditCtrl', function ($scope, $location, PlayerModel, ServerUrl, AuthenticationModel, CacheHelper) {

	$scope.ServerUrl = ServerUrl;
	$scope.PlayerModel = PlayerModel;

	$scope.playerId = AuthenticationModel.player.id;

	$scope.player = {
		name: null,
		location: null,
		bio: null,
		rate: null,
		rateArray: null,
		gender: null,
		email: null,
		backgroundImageId: null
	};

	//
	// Make sure the model has the current signed in player.
	//
	PlayerModel.getById($scope.playerId).then(function (data) {
		$scope.player = data;
	});

	$scope.update = function (player) {
		PlayerModel.update(player).then(function () {
			$location.path('/player/' + $scope.playerId);
			CacheHelper.remove($scope.playerId);
		});
	};

	$scope.updateBackgroundImageId = function (id) {
		$scope.player.backgroundImageId = id;
	};

	$scope.updateRate = function (rate) {
		$scope.player.rate = rate;
	};

	$scope.$watch('player.rate', function (rate) {
		var i = 0,
            max = 5,
            array = [];

        while (i < max) {
            if (rate > 0) {
                array.push(1);
            } else {
                array.push(0);
            }

            rate--;
            i++;
        }

        $scope.player.rateArray = array;
	});
});