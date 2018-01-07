angular.module('mufcg')
  .controller('AllReqTableCtrl', function ($scope, $state, $window, Request) {
    const init = () => {
      if (!localStorage.getItem("all-requests")) {
        Request.getAll().then(res => {
          $window.localStorage.setItem('all-requests', res.data);
          $scope.requests = res.data;
        });
      } else {
        $scope.requests = $window.localStorage.getItem('all-requests');
      }
    };

    (function main() {
      init();
    })();

  });
