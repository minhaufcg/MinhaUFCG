angular.module('mufcg')
.directive('navBar', function () {
    return {
        restrict : "AE",
        templateUrl : '/templates/directives/nav-bar/nav-bar.html',
        scope : {
            page : '='
        },
        controller : function ($scope, $location) {
            $scope.enabled = false;
            $scope.collapsed = false;
            const FORBIDDEN = ['/login', '/register', '/'];

            $scope.getCollapseClass = function () {
                return $scope.isCollapsed ?
                 "collapse navbar-collapse is-collapsed" : "collapse navbar-collapse";
            };

            $scope.test = function () {
                $scope.collapsed = !$scope.collapsed;
            };

            $scope.getCollapsedStyle = function () {
                return $scope.collapsed ? { 'margin-top' : '28px', 'z-index' : 20} : {};
            };

            $scope.isActive = function (page) {
                return page === $scope.page ? "active" : "";
            }

            $scope.$on('$locationChangeSuccess', function(event){
                console.log($location.url());
                $scope.enabled = $location.url() && FORBIDDEN.indexOf($location.url()) === -1;
                console.log($scope.enabled);
            });

        }
    }
});