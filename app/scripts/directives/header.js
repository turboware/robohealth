angular.module('myDemoApp')
.directive("headerDir", function() {
	 'use strict';
    return {
        restrict: 'AEC',
        templateUrl: 'partials/header.html',
    };
});
