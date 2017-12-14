const app = angular.module('mufcg');

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    const home = {
        name : 'home',
        url : '/home',
        templateUrl : '/templates/pages/home.html',
        controller : 'HomeCtrl'
    };
    
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

    const editRequest = {
        name : 'edit_request',
        url : '/request/edit/:id',
        templateUrl : '/templates/pages/edit-request.html',
        controller : 'EditRequestCtrl'
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
        templateUrl: "/templates/pages/manage-requests.html",
        controller: 'ReqTableCtrl'
    }

    const manageMaps = {
        name: 'manage.maps',
        templateUrl: "/templates/pages/manage-maps.html"
    }

    const manageAdmins = {
        name: 'manage.admins',
        templateUrl: "/templates/pages/manage-admins.html",
        controller: "ManageAdminCtrl"
    }

    $stateProvider
        .state(login)
        .state(register)
        .state(createRequest)
        .state(editRequest)
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
    var redirectState = 'login';
    var noAuthRoutes = {
        'login': true,
        'register': true
    };
    var adminRoutes = {
        'manage': true,
        'manage.requests': true,
        'manage.maps': true,
        'manage.admins': true
    };
    $transitions.onStart({
        to: function(state) {
            var authNeeded = false;
            var notAuthorized = false;
            var isAdmin = AuthService.isAdmin();

            if(AuthService.isLoggedIn()) {
                var isAdminRoute = adminRoutes[state.name];

                if(isAdminRoute) {
                    redirectState = 'home';
                    notAuthorized = !isAdmin;
                }
            } else {
                var forbiddenRoute = !noAuthRoutes[state.name];
                authNeeded = forbiddenRoute;
            }

            return authNeeded || notAuthorized;
        }
    }, function notAllowed(transition) {
        $state.go(redirectState, {
            redirect: $location.path()
        });
    });
});
