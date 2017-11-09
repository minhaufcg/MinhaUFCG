angular.module("mufcg").factory('Request', function RequestFactory($http, PROPERTIES) {
    return {
        create : function (userId, description, priority) {
            var params = {
                author : userId,
                description : description,
                priority : priority
            };

            return $http.post(PROPERTIES.restBasePath + "/requests",$.param(params), { headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
        },

        getByAuthor : function (userId) {
            return $http.get(PROPERTIES.restBasePath + "/user/" + userId + "/requests/");
        }
    }
});