angular.module("mufcg").factory('User', function UserFactory($http, PROPERTIES) {
    var ADMIN_URI = '/api/admins';
    var USER_URI = '/api/users';

    return {
        getByRegistration: function (registration) {
            return $http.get(`${ADMIN_URI}/${registration}`);
        },

        addAdmin: function (registration) {
            return $http.post(`${ADMIN_URI}/${registration}`);
        },
    
        removeAdmin: function (registration) {
            return $http.delete(`${ADMIN_URI}/${registration}`);
        },

        getUsersByPropertyValue: function (property, value) {
            return $http.get(`${USER_URI}?${property}=${value}`);
        },

        update: function (userId, patch) {
            return $http.put(`${USER_URI}/${userId}`, patch);
        }
    }
});