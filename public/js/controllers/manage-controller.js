angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, AuthService) {
    $scope.isAdmin = false;
    
    $scope.isAdmin = function () {
        var currentUser = AuthService.getCurrentUser();
        return currentUser && currentUser.isAdmin;
    };
});
