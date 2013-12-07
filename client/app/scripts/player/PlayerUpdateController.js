//
// # Player Update Controller
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('PlayerUpdateCtrl',
	function ($scope, $location, PlayerService, AuthenticationService, CacheHelper) {

	$scope.PlayerService = PlayerService;

	$scope.playerId = AuthenticationService.player.id;

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
	// Make sure the `$scope` has the current signed in player.
	//
	PlayerService.getById($scope.playerId).then(function (data) {
		angular.extend($scope.player, data);
	});

	$scope.update = function (player) {
		PlayerService.update(player).then(function () {
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