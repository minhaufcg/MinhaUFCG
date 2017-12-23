angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, AuthService) {
    $scope.isAdmin = AuthService.isAdmin();
});
