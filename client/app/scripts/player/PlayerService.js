'use strict';

app.factory('PlayerService', function ($http, API_URL, PlayerModel) {

	this.getById = function (playerId) {
		return $http.get(API_URL + '/player/' + playerId)
			.success(function (data) {
				PlayerModel.player = data.payload[0];
			})
			.error(function () {
				PlayerModel.player = null;
			});
	};

	this.getCollection = function () {
		return $http.get(API_URL + '/player')
			.success(function(data){
				PlayerModel.collection = data.payload;
			})
			.error(function(){
				PlayerModel.collection = null;
			});
	};

	return this;

});