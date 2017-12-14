angular.module("mufcg").factory('User', function UserFactory($http, PROPERTIES) {
    return {
        getByRegistration: function (registration) {
            return $http.get('/api/admins/users/' + registration);
        }
    }
});