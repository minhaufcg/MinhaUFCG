
angular
    .module('mufcg')
    .service('AuthService', function AuthService($q, $http, $window) {
        var currentUser = undefined;

        var saveToken = function (token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['token'];
        };

        var logout = function () {
            $window.localStorage.removeItem('token');
        };

        var login = function (user) {
            var deferred = $q.defer();

            $http.post('/api/login', user).then(function success(response) {
                saveToken(response.data.token);
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var isLoggedIn = function () {
            var token = getToken();
            var payload = getPayload();

            if(payload) {
                var isNotExpired = payload.exp > Date.now() / 1000;
                return isNotExpired;
            } else {
                return false;
            }
        };
        
        var getCurrentUser = function () {
            if(isLoggedIn()) {
                var payload = getPayload();
                return {
                    name: payload.name,
                    registration: payload.registration,
                    id: payload.id,
                    campus: payload.campus,
                    role: payload.role
                };
            }
        };

        var register = function (user) {
            var deferred = $q.defer();

            $http.post('/api/users', user).then(function success(response) {
                saveToken(response.data.token);
                deferred.resolve()
            }, function error(response) {
                deferred.reject(response);                
            });

            return deferred.promise;
        };

        function getPayload() {
            var token = getToken();
            var payload;

            if(token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
            }

            return payload;
        }

        return {
            saveToken: saveToken,
            getToken: getToken,
            logout: logout,
            login: login,
            isLoggedIn: isLoggedIn,
            register: register,
            getCurrentUser: getCurrentUser
        };
});
