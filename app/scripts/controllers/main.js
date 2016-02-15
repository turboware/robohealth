'use strict';

/**
 * @ngdoc function
 * @name myDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myDemoApp
 */
 
angular.module('myDemoApp')
  .controller('MainCtrl', 
   ['$scope','machineListService','metricInfoService','notificationDetailService','alertDetailsService', function($scope, machineListService, metricInfoService, notificationDetailService, alertDetailsService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var $jq = jQuery.noConflict();


    $scope.oneAtATime = true;
    /**gets left-pane information from machineListService**/
    $scope.getAll = function() {
        machineListService.getJson().then(function(res) {
            $scope.machineList = res;
        });
    };
    $scope.getAll();
    //console.log($scope.machineList)
    /**gets home page information from notificationDetailService**/
    $scope.getData = function() {
        notificationDetailService.getJson().then(function(res) {
                $scope.notificationDetail = res;
            });
    };
    $scope.getData();
    $scope.setsendId = function(machineName, health, metricName) {
        $scope.machineName = machineName;
        $scope.metricName = metricName;
        $scope.health = health;
    };
    $scope.getsendId = function() {
            if ($scope.health === 'critical') {
                return "glyphicon glyphicon-ban-circle red";
            } else if ($scope.health === 'high') {
                return "glyphicon glyphicon-warning-sign yellow ";
            } else if ($scope.health === 'medium') {
                return "glyphicon glyphicon-flag blue";
            } else {
                return "glyphicon glyphicon-ok-circle green";
            }
        };
        /**gets metric information from metricInfoservice**/
    $scope.showMetricDetails = function() {
        metricInfoService.getmetricData().then(function success(res) {
            $scope.metricInfo = res;
        });
    };
    $scope.showMetricDetails();
    $scope.getAll = function() {
        alertDetailsService.getalertData().then(function(res) {
            $scope.alertData = res;
        });
    };
    $scope.getAll();
    /**highcharts**/
    $jq('#highchart').highcharts({
        chart: {
            renderTo: '#highchart',
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Time series of metric variation of machine',
            x: -20, //center
            margin: 70,
        },
        xAxis: {},
        yAxis: {
            title: {
                text: null,
            },
            gridLineWidth: 1,
            min: 0,
            max: 700,
            tickInterval: 100,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            labels: {
                min: 0,
                max: 700,
                tickInterval: 100,
            }
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'horizontal',
            y: 20,
            align: 'center',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: 'Actual',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'UCL',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'LCL',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
          }, ]
	    });
		


  }])

.filter('duplicates', function() {
    return function(mac) {
        var arr = [];
        var healthCheck = ['low', 'medium', 'critical', 'high'];
        angular.forEach(mac, function(v) {
            if (arr.length === 0) {
                arr.push(v);
            } else {
                var flag = true;
                angular.forEach(arr, function(val, index) {
                    if (val.name) {
                        if (val.name === v.name) {
                            if (healthCheck.indexOf(v.health) >= healthCheck.indexOf(val.health)) {
                                arr[index].health = v.health;
                            }
                            flag = false;
                            return;
                        }
                    } else {
                        if (val.alert_id === v.alert_id) {
                            if (healthCheck.indexOf(v.health) >= healthCheck.indexOf(val.health)) {
                                arr[index].health = v.health;
                            }
                            flag = false;
                            return;
                        }
                    }

                });
                if (flag) {
                    arr.push(v);
                }
            }
        });
        return arr;
    };
});