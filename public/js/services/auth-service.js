angular.module('mufcg')
.service('authService', function () {
    var currentUser = undefined;

    return {
        setCurrentUser : function (user) {
            currentUser = user;
        },

        getCurrentUser : function () {
            return currentUser;
        }
    }
});