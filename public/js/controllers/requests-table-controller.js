angular.module('mufcg')
  .controller('ReqTableCtrl', function ($scope, $state, $window, Request, AuthService) {
    function init() {
      Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
        $window.localStorage.setItem('requests', JSON.stringify(res.data));
        $scope.requests = res.data;
      });
    };


    (function main() {
      init();
    })();

    $scope.editResquest = function (request) {
      $state.go('edit_request', {
        id: request._id
      });
    };

  });
