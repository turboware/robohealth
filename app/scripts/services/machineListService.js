angular.module('myDemoApp')
.factory("machineListService", ['$http','$q',function($http, $q) {
    'use strict';
    var data = {};
    data.getJson = function() {
        var defer = $q.defer();
        $http.get("json/machineList.json")
            .success(function(res) {
                data.macList = res;
                defer.resolve(res);
            })
            .error(function(err) {
                defer.reject(err);
            });
        return defer.promise;
    };
    return data;
}]);
