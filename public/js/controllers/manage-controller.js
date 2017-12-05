angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, $window, Request, AuthService) {
    $scope.initTable = function() {
      Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
        $window.localStorage.setItem('requests', JSON.stringify(res.data));
        $scope.requests = res.data;
      });
    };
    $scope.initTable();
});
