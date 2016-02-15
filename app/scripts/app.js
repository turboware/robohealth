'use strict';

/**
 * @ngdoc overview
 * @name myDemoApp
 * @description
 * # myDemoApp
 *
 * Main module of the application.
 */
angular.module('myDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/MetricInfo', {
        templateUrl: 'partials/metric-info.html',
        controller: 'MainCtrl'
      })
      .when('/MyAlerts', {
         templateUrl: 'partials/my-alerts.html',
         controller: 'MainCtrl'
      })
      .otherwise({
         redirectTo: '/'
      });
  });
