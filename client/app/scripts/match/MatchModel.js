//
//
//

'use strict';

app.factory('MatchModel', function ($http, ApiUrl, AuthenticationModel) {

	this.collection = null;
	this.match = {
		venue: null,
		players: null,
		when: null,
		price: null,
		organizer: null,
		meta: {
			created: null,
			modified: null
		}
	};

	var getParams = {
		populate: [
			'venue',
			'players',
			'organizer'
		].join(',')
	};

	var parseMatches = function (matches) {
		_.each(matches, function (match) {
			match.id = match._id;

			// All players
			var players = match.players;

			// Players not including me.
			var otherPlayers = _.where(players, function (player) {
				return player.id !== AuthenticationModel.player.id;
			});

			// First 3 other players
			match.playersDisplay = otherPlayers.splice(0, 3);

			// Rest of the players
			match.playersExtra = otherPlayers.splice(0);
		});

		return matches;
	};

	this.getById = function (matchId) {
		return $http.get(ApiUrl + '/match/' + matchId, {
				params: getParams
			})
			.success(angular.bind(this, function (data) {
				this.match = _.first(parseMatches(data.payload));
			}))
			.error(angular.bind(this, function () {
				this.match = null;
			}));
	};

	this.getCollection = function () {
		return $http.get(ApiUrl + '/match', {
				params: getParams
			})
			.success(angular.bind(this, function(data){
				this.collection = parseMatches(data.payload);
			}))
			.error(angular.bind(this, function(){
				this.collection = null;
			}));
	};

	this.join = function (match) {
		return $http.post(ApiUrl + '/match/' + match.id + '/join')
			.success(angular.bind(this, function (data){
				match.players.push(AuthenticationModel.player);
			}))
			.error(angular.bind(this, function(){
				console.log('MatchModel join error');
			}));
	};

	this.leave = function (match) {
		return $http.post(ApiUrl + '/match/' + match.id + '/leave')
			.success(angular.bind(this, function (){

				var playerIndex = _.findIndex(match.players, function (player) {
					return player.id == AuthenticationModel.player.id;
				});

				if (playerIndex > -1) {
					match.players.splice(playerIndex, 1);
				}

			}))
			.error(angular.bind(this, function() {
				console.log('MatchModel leave error');
			}));
	};

	this.save = function (match) {

	};

	this.clear = function () {
		this.match = {};
	};

	return this;

});