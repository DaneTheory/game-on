'use strict';

app.factory('DateHelper', function () {

	var getAgeFromBirthday = function(birthday) {
		var today = new Date(),
			age = today.getFullYear() - birthday.getFullYear(),
 			months = today.getMonth() - birthday.getMonth();

	    if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
	        age--;
	    }

	    return age;
	};

	return {
		getAgeFromBirthday: getAgeFromBirthday
	}

});