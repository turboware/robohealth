angular.module('myDemoApp')
.factory("notificationDetailService",['$http','$q', function($http, $q) {
     'use strict';
    var data = {};
    data.getJson = function() {
        var defer = $q.defer();
        $http.get("json/notification.json")
            .success(function(res) {

                defer.resolve(res);
            })
            .error(function(err) {
                defer.reject(err);
            });
        return defer.promise;
    };
    return data;
}]);
