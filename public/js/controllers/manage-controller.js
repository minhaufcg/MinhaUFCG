angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, AuthService) {
    $scope.isAdmin = () => {
      let role = AuthService.getCurrentUser();
      return role === 'admin';
    };
});
