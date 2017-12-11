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

    $scope.showPending = function() {
      $scope.toggle = true;
    };

    $scope.showResolved = function() {
      if(!$scope.allResolvedReq) {
        Request.getAllResolved().then(() =>{
          $window.localStorage.setItem('requests-resolved', JSON.stringify(res.data));
          $scope.allResolvedReq = req.data;          
        });
      }
      $scope.toggle = false;     
    };

    $scope.isPending = function(request) {
      return request.status === 'pending';
    };

  });
