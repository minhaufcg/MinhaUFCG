angular.module('mufcg')
.controller("ManageUsersCtrl", function ManageUsersCtrl($scope, User) {
    $scope.filter = 'untrusted';
    $scope.users = [];

    $scope.block = function (user) {
        setVerification("rejected", user);
    };

    $scope.unblock = function (user) {
        setVerification("untrusted", user);
    };

    $scope.accept = function (user) {
        setVerification("trusted", user);
    };

    function getUsersByVerification(value) {
        User.getUsersByPropertyValue('verification', value)
        .then(function(response) {
            $scope.users = response.data;
        }, function(error) {
            console.error(error);
        });
    }

    function setVerification(value, user) {
        User.update(user._id, {verification: value})
        .then(function (response) {
            user.verification = value;
        }, function (error) {
            console.error(error);
        });
    }

    (function loadUsers() {
        getUsersByVerification($scope.filter);
    })();
});