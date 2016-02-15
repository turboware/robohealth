angular.module('myDemoApp')
.factory("metricInfoService", ['$http','$q',function($http, $q) {
     'use strict';
    var data = {};
    data.getmetricData = function() {
        var defer = $q.defer();
        $http.get("json/metricInfo.json")
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
