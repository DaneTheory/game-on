app.controller('MenuCtrl', function ($scope, $http, $location) {
	
	$scope.logout = function(){
		$http.get('http://localhost:3000/logout', {withCredentials: true})
			.success(function(data, status, headers, config){
				$location.path('/');
			}).error(function(data, status, headers, config){
				console.log('[error] data', data);
				console.log('[error] status', status);
				console.log('[error] headers', headers);
				console.log('[error] config', config);
			});
	};

});