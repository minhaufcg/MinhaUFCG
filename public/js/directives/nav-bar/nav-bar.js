angular.module('mufcg')
.directive('navBar', function () {
    return {
        restrict : "AE",
        templateUrl : '/templates/directives/nav-bar/nav-bar.html',
        scope : {},
        controller : function ($scope, $location, AuthService, $state) {
            $scope.isCollapsed = false;
            $scope.isAdmin = false;
            $scope.enabled = locationIsAllowed();

            $scope.getCollapseClass = function () {
                return $scope.isCollapsed ?
                 "collapse navbar-collapse is-collapsed" : "collapse navbar-collapse";
            };

            $scope.getCollapsedStyle = function () {
                return $scope.isCollapsed ? { 'margin-top' : '28px', 'z-index' : 20} : {};
            };

            $scope.$on('$locationChangeSuccess', function(event){
                $scope.enabled = $location.url() && locationIsAllowed();           
            });

            $scope.logout = function () {
                AuthService.logout().then(function success() {
                    $state.go('login');
                }, function error(response) {
                    //TODO: deal with errors
                    console.log(response.message);
                })
            };

            $scope.isAdmin = function () {
                var currentUser = AuthService.getCurrentUser();
                return currentUser && currentUser.isAdmin;
            };

            function locationIsAllowed() {
                const FORBIDDEN = ['/login', '/register', '/'];
                return FORBIDDEN.indexOf($location.url()) === -1;
            }
        }
    }
});