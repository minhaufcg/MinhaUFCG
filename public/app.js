"use strict";

(function() {
    var app = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.router'
    ]);

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $stateProvider
            .state("app", {
                url: "/",
                views: {
                    main: {
                        templateUrl: "./templates/main.html",
                        controller: "TestController as testCtrl"
                    }
                }
            });

            
        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true);
    });

})();