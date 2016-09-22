'use strict';

/* Controllers */

var appLungeFilters = angular.module('appLungeFilters', [])

appLungeFilters.filter('numberFormat', function() {
	return function(input) {
		if(isNaN(input))
		 input = 0;
		if (input == 100.00) {
			return input.toFixed(1);
		} else {
			return input.toFixed(2);
		}
	};
});
