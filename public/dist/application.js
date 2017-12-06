'use strict';

angular.module('mufcg', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ngMap']);

angular.module('mufcg').controller('MapModalCtrl', ['$scope', 'LOCATIONS', 'NgMap', 'messagebox', '$uibModalInstance', 'mapHelper', function ($scope, LOCATIONS, NgMap, messagebox, $uibModalInstance, mapHelper) {
    var map = undefined;
    var ufcgPolygon = undefined;

    NgMap.getMap().then(function (mapResult) {
        map = mapResult;

        google.maps.event.trigger(map, "resize");
        map.setCenter(LOCATIONS.UFCG.center);

        ufcgPolygon = mapHelper.getPolygon(LOCATIONS.UFCG.polygon);
        mapHelper.deleteAllMarkers();
    });

    $scope.createMarker = function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        if (!google.maps.geometry.poly.containsLocation(event.latLng, ufcgPolygon)) {
            messagebox.fail('O local que você escolheu para criar a ocorrência fica fora das dependências do seu campus', 'Local inválido');
        } else {
            if (mapHelper.getMarkers().length > 0) mapHelper.deleteAllMarkers();

            var marker = new google.maps.Marker();
            marker.setMap(map);
            marker.setPosition(event.latLng);
            marker.setTitle("Nova ocorrência");

            mapHelper.addMarker(marker);

            setMarker(lat, lng, false);
        }
    };

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var posFun = {
                    lat: function lat() {
                        return position.coords.latitude;
                    },
                    lng: function lng() {
                        return position.coords.longitude;
                    }
                };

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if (!google.maps.geometry.poly.containsLocation(posFun, ufcgPolygon)) {
                    messagebox.fail("Você não está no campus, não é possível marcar esta localização", "Local inválido");
                } else {
                    map.setCenter(pos);

                    var marker = new google.maps.Marker();
                    marker.setMap(map);
                    marker.setPosition(pos);

                    setMarker(pos.lat, pos.lng, true);
                    mapHelper.addMarker(marker);
                }
            }, function () {
                messagebox.fail("Você bloqueou o acesso da aplicação a sua localização. " + "Sem sua permissão não será possível a atualização de funcionalidades com geolocalização." + "<br><br><a target='_blank' href='/'>Clique aqui para saber como desbloquear</a>");
            });
        }
    };

    $scope.dragLimit = function () {
        mapHelper.dragEnd(ufcgPolygon, LOCATIONS.UFCG.center);
    };

    function setMarker(lat, lng, geolocation) {
        $scope.marker = {
            lat: lat,
            lng: lng,
            geolocation: geolocation
        };
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.marker);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
var app = angular.module('mufcg');

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var loginState = {
        name: 'login',
        url: '/',
        templateUrl: '/templates/pages/login.html',
        controller: 'LoginCtrl'
    };

    var registerState = {
        name: 'register',
        url: '/register',
        templateUrl: '/templates/pages/register.html',
        controller: 'RegisterCtrl'
    };

    var createRequestState = {
        name: 'create_request',
        url: '/request/create',
        templateUrl: '/templates/pages/create-request.html',
        controller: 'CreateRequestCtrl'
    };

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: '/templates/pages/home.html',
        controller: 'HomeCtrl'
    };

    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(createRequestState);
    $stateProvider.state(homeState);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('BearerAuthInterceptor');
}]);

app.factory('BearerAuthInterceptor', ['$injector', '$q', '$state', function ($injector, $q, $state) {
    return {
        request: function request(config) {
            var AuthService = $injector.get('AuthService');
            config.headers = config.headers || {};
            if (AuthService.isLoggedIn()) {
                var token = AuthService.getToken();
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },

        responseError: function responseError(response) {
            if (response.status === 401 || response.status === 403) {
                $state.go('login');
            }

            return $q.reject(response);
        }
    };
}]);

app.run(['AuthService', '$transitions', '$state', '$location', function authInterceptor(AuthService, $transitions, $state, $location) {
    var allowedRoutes = {
        login: true,
        register: true
    };
    $transitions.onStart({
        to: function to(state) {
            return !allowedRoutes[state.name] && !AuthService.isLoggedIn();
        }
    }, function (transition) {
        $state.go("login", {
            "redirect": $location.path()
        });
    });
}]);
angular.module('mufcg').constant('LOCATIONS', {
    UFCG: {
        polygon: [{ lat: -7.211582063794847, lng: -35.908427238464355 }, { lat: -7.211954602379666, lng: -35.90901732444763 }, { lat: -7.21215683748306, lng: -35.90925335884094 }, { lat: -7.212603883180555, lng: -35.9093177318573 }, { lat: -7.213178655571561, lng: -35.9093177318573 }, { lat: -7.213561836760166, lng: -35.909414291381836 }, { lat: -7.213998237163229, lng: -35.90957522392273 }, { lat: -7.21434948596254, lng: -35.90980052947998 }, { lat: -7.214604939463547, lng: -35.91011166572571 }, { lat: -7.2147965294947145, lng: -35.9103262424469 }, { lat: -7.214988119444751, lng: -35.910712480545044 }, { lat: -7.2152116409506375, lng: -35.91112017631531 }, { lat: -7.2153819429762605, lng: -35.911463499069214 }, { lat: -7.21560546428765, lng: -35.911903381347656 }, { lat: -7.215818341624408, lng: -35.91227889060974 }, { lat: -7.216105725870212, lng: -35.91256856918335 }, { lat: -7.216414397634615, lng: -35.912686586380005 }, { lat: -7.2166485622809615, lng: -35.912718772888184 }, { lat: -7.21695723367506, lng: -35.91247200965881 }, { lat: -7.21697852134966, lng: -35.912150144577026 }, { lat: -7.217106247376168, lng: -35.91150641441345 }, { lat: -7.21718075420832, lng: -35.910948514938354 }, { lat: -7.21722332953546, lng: -35.91048717498779 }, { lat: -7.217329767835804, lng: -35.91002583503723 }, { lat: -7.217340411664459, lng: -35.90956449508667 }, { lat: -7.217382986976575, lng: -35.90938210487366 }, { lat: -7.217265904858604, lng: -35.90904951095581 }, { lat: -7.217106247376168, lng: -35.908459424972534 }, { lat: -7.21697852134966, lng: -35.907922983169556 }, { lat: -7.216776288400609, lng: -35.907440185546875 }, { lat: -7.216637918436021, lng: -35.906914472579956 }, { lat: -7.216542123820367, lng: -35.90656042098999 }, { lat: -7.216414397634615, lng: -35.90588450431824 }, { lat: -7.216371822231359, lng: -35.90559482574463 }, { lat: -7.215541601067087, lng: -35.90563774108887 }, { lat: -7.214924256137079, lng: -35.905680656433105 }, { lat: -7.21348732933222, lng: -35.905659198760986 }, { lat: -7.212359072496125, lng: -35.905669927597046 }, { lat: -7.212061041919028, lng: -35.90564846992493 }, { lat: -7.211880094687213, lng: -35.905702114105225 }, { lat: -7.211603351722236, lng: -35.90587377548218 }, { lat: -7.211401116371638, lng: -35.90612053871155 }, { lat: -7.211284032706316, lng: -35.906431674957275 }, { lat: -7.211262744763913, lng: -35.906742811203 }, { lat: -7.211198880930712, lng: -35.907193422317505 }, { lat: -7.211188236957634, lng: -35.90764403343201 }],
        center: {
            lat: -7.214250,
            lng: -35.909188
        }
    }
});
"use strict";

var BASE_PATH = "api";

angular.module("mufcg").constant('PROPERTIES', {
    restBasePath: BASE_PATH
});
angular.module('mufcg').controller('CreateRequestCtrl', ['$scope', 'AuthService', 'Request', '$uibModal', 'messagebox', '$location', function ($scope, AuthService, Request, $uibModal, messagebox, $location) {
    //authService.getCurrentUser()._id
    $scope.create = function () {
        Request.create(AuthService.getCurrentUser().id, $scope.request).then(function () {
            messagebox.success('Solicitação cadastrada com sucesso', undefined, creationCallback());
        }, function (err) {
            messagebox.fail('Ocorreu um erro na criação da solicitação');
        });
    };

    function creationCallback() {
        $location.url("/home");
    }

    $scope.pop = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/components/map-modal.html',
            controller: 'MapModalCtrl',
            scope: this,
            size: 'xl'
        });

        modalInstance.result.then(function (marker) {
            $scope.request.location.lat = marker.lat;
            $scope.request.location.lng = marker.lng;
            $scope.request.location.geolocation = marker.geolocation;
        });
    };
}]);
angular.module('mufcg').controller('HomeCtrl', ['$scope', 'NgMap', 'mapHelper', 'LOCATIONS', 'AuthService', 'Request', function ($scope, NgMap, mapHelper, LOCATIONS, AuthService, Request) {
    var map = undefined;
    var ufcgPolygon = undefined;

    $scope.initMap = function () {
        NgMap.getMap().then(function (mapResult) {
            map = mapResult;

            if (!mapHelper.getMap()) mapHelper.initMap(map);

            mapHelper.deleteAllMarkers();

            ufcgPolygon = mapHelper.getPolygon(LOCATIONS.UFCG.polygon);

            loadAuthorRequests();
        });
    };

    $scope.dragLimit = function () {
        mapHelper.dragEnd(ufcgPolygon, LOCATIONS.UFCG.center);
    };

    function loadAuthorRequests() {
        Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
            res.data.forEach(function (request) {
                var location = {};
                location.lat = request.location.lat;
                location.lng = request.location.lng;
                createMarker(request.title, request.description, undefined, request.createdOn, location);
            });
        });
    }

    function createMarker(title, description, image, date, location) {
        var contentString = '<h1>' + title + '</h1>' + '<p>' + description + '</p>' + '<img src="' + image + '" style="height: 100px; width : auto" alt=""><br>' + '<p>' + date + '</p>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker();
        marker.setMap(map);
        marker.setPosition(location);
        marker.setTitle(title);

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        mapHelper.addMarker(marker);
    }
}]);
angular.module('mufcg').controller('LoginCtrl', ['$scope', 'User', 'AuthService', '$state', 'messagebox', function ($scope, User, AuthService, $state, messagebox) {

    $scope.login = function () {
        var credentials = {
            registration: $scope.registration,
            password: $scope.password
        };
        AuthService.login(credentials).then(function success(response) {
            $state.go("home");
        }, function error(response) {
            messagebox.fail("Matrícula ou senha incorretos");
        });
    };
}]);
angular.module('mufcg').controller('RegisterCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {

    $scope.register = function () {
        if ($scope.user.password !== $scope.confirmPassword) {
            alert('Senhas divergem!');
        } else {
            $scope.user.role = "student";
            AuthService.register($scope.user).then(function () {
                alert('Usuário cadastrado com sucesso');
                $state.go("login");
            }, function error(response) {
                console.warn(response.message);
            });
        }
    };
}]);

angular.module('mufcg').service('AuthService', ['$q', '$http', '$window', function AuthService($q, $http, $window) {
    var currentUser = undefined;

    var saveToken = function saveToken(token) {
        $window.localStorage['token'] = token;
    };

    var getToken = function getToken() {
        return $window.localStorage['token'];
    };

    var logout = function logout() {
        $window.localStorage.removeItem('token');
    };

    var login = function login(user) {
        var deferred = $q.defer();

        $http.post('/api/login', user).then(function success(response) {
            saveToken(response.data.token);
            deferred.resolve(response);
        }, function error(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    var isLoggedIn = function isLoggedIn() {
        var token = getToken();
        var payload = getPayload();

        if (payload) {
            var isNotExpired = payload.exp > Date.now() / 1000;
            return isNotExpired;
        } else {
            return false;
        }
    };

    var getCurrentUser = function getCurrentUser() {
        if (isLoggedIn()) {
            var payload = getPayload();
            return {
                name: payload.name,
                registration: payload.registration,
                id: payload.id
            };
        }
    };

    var register = function register(user) {
        var deferred = $q.defer();

        $http.post('/api/users', user).then(function success(response) {
            saveToken(response.data.token);
            deferred.resolve();
        }, function error(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    function getPayload() {
        var token = getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
        }

        return payload;
    }

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        login: login,
        isLoggedIn: isLoggedIn,
        register: register,
        getCurrentUser: getCurrentUser
    };
}]);

angular.module('mufcg').service('mapHelper', ['NgMap', function (NgMap) {
    var markers = [];
    var map = undefined;
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }
    return {
        initMap: function initMap(markersMap) {
            map = markersMap;
        },
        getMap: function getMap() {
            return map;
        },
        addMarker: function addMarker(marker) {
            markers.push(marker);
        },
        getMarkers: function getMarkers() {
            return markers;
        },
        hideMarkers: function hideMarkers() {
            clearMarkers();
        },
        showAllMarkers: function showAllMarkers() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        },
        deleteAllMarkers: function deleteAllMarkers() {
            clearMarkers();
            markers = [];
        },
        getPolygon: function getPolygon(coords) {
            return new google.maps.Polygon({ paths: coords });
        },
        dragEnd: function dragEnd(polygon, center) {
            if (!google.maps.geometry.poly.containsLocation(map.getCenter(), polygon)) map.setCenter(center);
        }
    };
}]);
angular.module('mufcg').service('messagebox', function () {
    var successModal = function successModal(message, title, callback) {
        defaultModal(getCustomTitle(title || "Sucesso", 'white', true), message, 'small', getButton('ok', 'OK', 'btn-success'), false, "success-modal");
    };

    var failModal = function failModal(message, title, callback) {
        defaultModal(getCustomTitle(title || "Falha de autenticação", 'white', true), message, 'small', getButton('ok', 'OK', 'btn-danger'), false, "danger-modal");
    };

    var defaultModal = function defaultModal(title, message, size, buttons, closeButton, customClass, callback) {
        bootbox.dialog({
            title: title,
            message: message,
            size: size || "small",
            buttons: buttons || {},
            closeButton: closeButton,
            className: customClass || "",
            callback: callback || function () {}
        });
    };

    function getButton(name, label, className, callback) {
        var buttons = {};

        buttons[name] = {
            label: label,
            className: className,
            callback: callback || function () {}
        };

        return buttons;
    }

    function getCustomTitle(text, color, bold) {
        return "<div style='color: " + color + (bold ? "; font-weight : bold'>" : "'>") + text + "</div>";
    }

    return {
        success: successModal,
        fail: failModal,
        custom: defaultModal
    };
});

angular.module('mufcg').directive('logo', function () {
    return {
        restrict: 'AE',
        templateUrl: '/templates/directives/logo/logo.html'
    };
});
angular.module('mufcg').directive('navBar', function () {
    return {
        restrict: "AE",
        templateUrl: '/templates/directives/nav-bar/nav-bar.html',
        scope: {
            page: '='
        },
        controller: ['$scope', '$location', function controller($scope, $location) {
            $scope.enabled = false;
            $scope.collapsed = false;
            var FORBIDDEN = ['/login', '/register', '/'];

            $scope.getCollapseClass = function () {
                return $scope.isCollapsed ? "collapse navbar-collapse is-collapsed" : "collapse navbar-collapse";
            };

            $scope.test = function () {
                $scope.collapsed = !$scope.collapsed;
            };

            $scope.getCollapsedStyle = function () {
                return $scope.collapsed ? { 'margin-top': '28px', 'z-index': 20 } : {};
            };

            $scope.isActive = function (page) {
                return page === $scope.page ? "active" : "";
            };

            $scope.$on('$locationChangeSuccess', function (event) {
                console.log($location.url());
                $scope.enabled = $location.url() && FORBIDDEN.indexOf($location.url()) === -1;
                console.log($scope.enabled);
            });
        }]
    };
});
angular.module("mufcg").factory('Request', ['$http', 'PROPERTIES', function RequestFactory($http, PROPERTIES) {
    return {
        create: function create(userId, request) {
            var params = {
                'author': userId,
                'request': request
            };

            return $http.post(PROPERTIES.restBasePath + "/requests", params, { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getByAuthor: function getByAuthor(userId) {
            return $http.get(PROPERTIES.restBasePath + "/user/" + userId + "/requests/");
        }
    };
}]);
angular.module("mufcg").factory('User', ['$http', 'PROPERTIES', function UserFactory($http, PROPERTIES) {
    return {};
}]);