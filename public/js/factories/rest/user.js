angular.module("mufcg").factory('User', function UserFactory($http, PROPERTIES) {
    return {
        register : function (name, identification, password, role) {
            var params = {
                name : name,
                password : password,
                identification : identification,
                role : role
            };

            return $http.post(PROPERTIES.restBasePath + "/users",$.param(params), { headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
        }
    }
});