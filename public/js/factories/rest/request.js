angular.module("mufcg").factory('Request', function RequestFactory($http, PROPERTIES) {
    return {
        create : function (userId, request) {
            var params = {
                'author' : userId,
                'request' : request
            };

            return $http.post(PROPERTIES.restBasePath + "/requests", params, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getByAuthor : function (userId) {
            return $http.get(PROPERTIES.restBasePath + "/user/" + userId + "/requests/");
        }
    }
});