//
// # Denote Null Filter
// Output text when an object is null
//
// ### filter denoteNull (item, name, placeholder)
// #### @item {object} Required. Object to be tested for null-ness.
// #### @name {string} Optional. The name to display for the object if it's null-like.
// #### @placeholder {string} Optional. The placeholder text to insert @name into.
// Either returns the original object, or a string noting that the object is null-like.
// @placeholder accepts strings with `%%name%%` in them, like this;
// `%%name%% is empty!`
//
// 2013 Pablo De Nadai
//

'use strict';

app.filter('denoteNull', function() {
	return function(item, name, placeholder) {
		if (!name) {
			name = "Item";

			// If we don't have a custom placeholder, use slightly different language to make it appropriate.
			if (!placeholder) {
				placeholder = "(%%name%% Unavailable)";
			}
		}

		if (!placeholder) {
			placeholder = "(No %%name%%)";
		}

		if (typeof item === 'undefined' || item === null) {

			return placeholder.replace("%%name%%", name);

		} else if (typeof item === 'string') {

			// Trim the string of whitespace.
			var trimmedText = String(item).replace(/^\s+|\s+$/g, '');

			if (trimmedText.length === 0) {
				return  placeholder.replace("%%name%%", name);
			}

		}

		return item;

	};
});