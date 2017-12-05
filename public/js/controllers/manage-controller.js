angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, $window, Request, AuthService) {
    $scope.initTable = function() {
      Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
        $window.localStorage['requests'] = res.data;
        $scope.requests = res.data;
      });
    };
    $scope.initTable();
});
