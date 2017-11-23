const app = angular.module('mufcg');

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

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

    $httpProvider.interceptors.push('BearerAuthInterceptor');
});

app.factory('BearerAuthInterceptor', function($injector, $q, $state) {
    return {
        request: function(config) {
            var AuthService = $injector.get('AuthService');
            config.headers = config.headers || {};
            if(AuthService.isLoggedIn()) {
                var token = AuthService.getToken();
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },

        responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
                $state.go('login');
            }

            return $q.reject(response);
        }
    };
});

app.run(function authInterceptor(AuthService, $transitions, $state, $location) {
    var allowedRoutes = {
        login: true,
        register: true
    };
    $transitions.onStart({
        to: function(state) {
            return !allowedRoutes[state.name] && !AuthService.isLoggedIn();
        }
    }, function(transition) {
        $state.go("login", {
            "redirect": $location.path()
        });
    });
});