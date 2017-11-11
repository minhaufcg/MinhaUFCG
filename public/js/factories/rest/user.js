angular.module("mufcg").factory('User', function UserFactory($http, PROPERTIES) {
    return {
        register : function (name, registration, password, role) {
            var params = {
                name : name,
                password : password,
                registration : registration,
                role : role
            };

            return $http.post(PROPERTIES.restBasePath + "/users",$.param(params), { headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
        },

        auth : function (registration, password) {
            var params = {
                registration : registration,
                password : password
            };

            return $http.post(PROPERTIES.restBasePath + "/auth",$.param(params), { headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }});

        }
    }
});