'use strict';

app.controller('VenueCtrl', function ($scope, $routeParams, $location, VenueModel) {

	$scope.VenueModel = VenueModel;

	$scope.venueId = $routeParams.venueId;
	$scope.latitude = $routeParams.latitude;
	$scope.longitude = $routeParams.longitude;
	$scope.maxDistance = 100; // Km

	$scope.getById = function () {
		VenueModel.getById($scope.venueId).success(function(){
			map();
		});
	};

	$scope.getCollection = function () {
		VenueModel.getCollection({
			latitude: $scope.latitude,
			longitude: $scope.longitude,
			maxDistance: $scope.maxDistance
		});
	};

	$scope.getGeoLocation = function(){
		navigator.geolocation.getCurrentPosition(
			getGeoLocationSuccess,
			getGeoLocationError
		);
	};

	var map = function () {
		var position = new google.maps.LatLng(
			VenueModel.venue.location[0], 
			VenueModel.venue.location[1]);

		var mapOptions = {
			zoom: 14,
			disableDefaultUI: true,
    		center: position,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);

		var marker = new google.maps.Marker({
			position: position,
			map: map,
			title: VenueModel.venue.name
		});

		return true;
	}

	var getGeoLocationSuccess = function(location) {
		// See https://groups.google.com/forum/?fromgroups#!topic/angular/nFbtADyEHg8
		$scope.$apply(function() {
			$location.search({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
		});
	};

	var getGeoLocationError = function(err) {
		console.log('[getGeoLocationError] err', err);
	};

});