angular.module('mufcg').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    const loginState = {
        name : 'login',
        url : '/',
        templateUrl : '/templates/pages/login.html',
        controller : 'LoginCtrl'
    };

    const registerState = {
        name : 'register',
        url : '/register',
        templateUrl : '/templates/pages/register.html',
        controller : 'RegisterCtrl'
    };

    $stateProvider.state(loginState);
    $stateProvider.state(registerState);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);
});