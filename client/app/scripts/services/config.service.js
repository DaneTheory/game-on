app.factory('ConfigService', function($http){

	'use strict';

	var Config = function(){
		this.API_URL = '//localhost:3000';
	};

	return new Config();

});