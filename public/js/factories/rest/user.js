angular.module("mufcg").factory('User', function UserFactory($http, PROPERTIES) {
    return {
        getByRegistration: function (registration) {
            return $http.get('/api/admins/' + registration);
        },

        addAdmin: function (registration) {
            return $http.post('/api/admins/' + registration);
        },
    
        removeAdmin: function (registration) {
            return $http.delete('/api/admins/' + registration);
        },

        getUntrustedUsers: function () {
            return $http.get('api/users/untrusted');
        }
    }
});