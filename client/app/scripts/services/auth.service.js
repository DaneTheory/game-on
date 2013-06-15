'use strict';

app.factory('AuthService', function($http, $location, ConfigService){

	var Auth = function(){
		// Use cookies instead...
		this.username = '';

		this.err = '';
	};

	Auth.prototype.logout = function(){
		var self = this;

		// Create $http abstraction to handle CORS and console logs..
		$http.get(ConfigService.API_URL + '/logout', {withCredentials: true})
			.success(function(data, status, headers, config){
				// Use cookies instead...	
				self.username = null;
				$location.path('/');
			});
	};

	Auth.prototype.login = function(username, password){
		var self = this;

		$http({
			method: 'POST', 
			url: ConfigService.API_URL + '/login', 
			withCredentials: true,
			data: {
				'username': username,
				'password': password
			}
		}).success(function(data, status, headers, config){
			// Use cookies instead...	
			self.username = 'blah';
			$location.path('/player');
		}).error(function(data, status, headers, config){
			self.err = data;
		});	
	};

	return new Auth();

});