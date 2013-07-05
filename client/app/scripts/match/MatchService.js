'use strict';

app.factory('MatchService', function ($http, API_URL, MatchModel) {

	this.getById = function (matchId) {
		return $http.get(API_URL + '/match/' + matchId)
			.success(function (data) {
				MatchModel.match = data.payload[0];
			})
			.error(function () {
				MatchModel.match = null;
			});
	};

	this.getCollection = function () {
		return $http.get(API_URL + '/match?populate=venue,players')
			.success(function(data){
				MatchModel.collection = data.payload;
			})
			.error(function(){
				MatchModel.collection = null;
			});
	};

	return this;

});