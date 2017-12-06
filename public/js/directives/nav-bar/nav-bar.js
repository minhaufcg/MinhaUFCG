angular.module('mufcg')
.directive('navBar', function () {
    return {
        restrict : "AE",
        templateUrl : '/templates/directives/nav-bar/nav-bar.html',
        scope : {},
        controller : function ($scope, $location, AuthService) {
            $scope.enabled = false;
            $scope.isCollapsed = false;
            const FORBIDDEN = ['/login', '/register', '/'];

            $scope.getCollapseClass = function () {
                return $scope.isCollapsed ?
                 "collapse navbar-collapse is-collapsed" : "collapse navbar-collapse";
            };

            $scope.getCollapsedStyle = function () {
                return $scope.isCollapsed ? { 'margin-top' : '28px', 'z-index' : 20} : {};
            };

            $scope.$on('$locationChangeSuccess', function(event){
                $scope.enabled = $location.url() && FORBIDDEN.indexOf($location.url()) === -1;
            });

            $scope.logout = function () {
                AuthService.logout();
            };
        }
    }
});