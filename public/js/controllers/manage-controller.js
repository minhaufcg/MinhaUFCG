angular.module('mufcg')
.controller('ManageCtrl', function($scope, $state, $window, Request, AuthService) {
    $scope.initTable = function() {
      Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
<<<<<<< HEAD
        $window.localStorage.setItem('requests', JSON.stringify(res.data));
=======
        $window.localStorage['requests'] = res.data;
>>>>>>> 947e92c... Created table for all user requests
        $scope.requests = res.data;
      });
    };
    $scope.initTable();
});
