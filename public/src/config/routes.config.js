(function () {
  'use strict';
  angular.module('minhaUFCG')
    .config(['stateHelperProvider', '$urlRouterProvider', '$locationProvider',
      function (stateHelperProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        stateHelperProvider
          .state({
            name: 'home',
            url: '/',
            // templateUrl: '',
            // controller: ''
          });
      }
    ]);
})();