angular.module('myDemoApp')
.factory("alertDetailsService",['$http','$q', function($http, $q) {
    "use strict";
    var data = {};
    data.getalertData = function() {
        var defer = $q.defer();
        $http.get("json/alertDetails.json")
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
