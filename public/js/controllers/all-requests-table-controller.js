angular.module('mufcg')
  .controller('AllReqTableCtrl', function ($scope, $state, $window, Request) {
    const init = () => {
      Request.getAll().then(res => {
        $window.localStorage.setItem('all-requests', res.data);
        $scope.requests = res.data;
      });
    };

    (function main() {
      init();
      $scope.statusOptions = ['pending', 'ongoing', 'done'];
    })();

    $scope.updateRequest = (req) => {
      console.log(req.status);
      Request.update(req).then(request => console.log(request));
    };

  });
