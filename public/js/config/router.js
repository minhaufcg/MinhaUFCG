const app = angular.module('mufcg');

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    const login = {
        name : 'login',
        url : '/',
        templateUrl : '/templates/pages/login.html',
        controller : 'LoginCtrl'
    };

    const register = {
        name : 'register',
        url : '/register',
        templateUrl : '/templates/pages/register.html',
        controller : 'RegisterCtrl'
    };

    const createRequest = {
        name : 'create_request',
        url : '/request/create',
        templateUrl : '/templates/pages/create-request.html',
        controller : 'CreateRequestCtrl'
    };

    const home = {
        name : 'home',
        url : '/home',
        templateUrl : '/templates/pages/home.html',
        controller : 'HomeCtrl'
    };

    const manage = {
        name: 'manage',
        url: '/manage',
        templateUrl: '/templates/pages/manage.html',
        controller: 'ManageCtrl',
        redirectTo: 'manage.requests'
    }

    const manageRequests = {
        name: 'manage.requests',
        templateUrl: "/templates/pages/manage-requests.html"
    }

    const manageMaps = {
        name: 'manage.maps',
        templateUrl: "/templates/pages/manage-maps.html"
    }

    const manageAdmins = {
        name: 'manage.admins',
        templateUrl: "/templates/pages/manage-admins.html"
    }

    $stateProvider
        .state(login)
        .state(register)
        .state(createRequest)
        .state(home)
        .state(manage)
        .state(manageRequests)
        .state(manageMaps)
        .state(manageAdmins)

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