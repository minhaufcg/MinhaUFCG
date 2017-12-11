angular.module("mufcg").factory('Request', function RequestFactory($http, PROPERTIES) {
    return {
        create : function (userId, request) {
            var params = {
                'author' : userId,
                'request' : request
            };

            return $http.post(PROPERTIES.restBasePath + "/requests", params, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        edit : function (userId, request) {
            return $http.put(PROPERTIES.restBasePath.concat('/requests/', request._id), {request}, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getByAuthor : function (userId) {
            return $http.get(PROPERTIES.restBasePath + "/user/" + userId + "/requests/");
        },

        getAllResolved : function() {
            return $http.get(PROPERTIES.restBasePath.concat('/requests', '?status=pending'));
        } 
    }
});