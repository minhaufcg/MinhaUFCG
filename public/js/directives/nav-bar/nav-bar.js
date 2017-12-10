angular.module('mufcg')
.directive('navBar', function () {
    return {
        restrict : "AE",
        templateUrl : '/templates/directives/nav-bar/nav-bar.html',
        scope : {},
        controller : function ($scope, $location, AuthService) {
            const FORBIDDEN = ['/login', '/register', '/'];
            
            $scope.isCollapsed = false;
            $scope.isAdmin = false;
            $scope.enabled = FORBIDDEN.indexOf($location.url()) === -1;

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

            $scope.isAdmin = function () {
                var currentUser = AuthService.getCurrentUser();
                return currentUser && currentUser.isAdmin;
            };
        }
    }
});