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

    const createRequestState = {
        name : 'create_request',
        url : '/request/create',
        templateUrl : '/templates/pages/create-request.html',
        controller : 'CreateRequestCtrl'
    };

    const homeState = {
        name : 'home',
        url : '/home',
        templateUrl : '/templates/pages/home.html',
        controller : 'HomeCtrl'
    };

    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(createRequestState);
    $stateProvider.state(homeState);

    $urlRouterProvider.otherwise("/");
    
    $locationProvider.html5Mode(true);
});