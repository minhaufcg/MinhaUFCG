angular.module('mufcg')
.controller("ManageAdminCtrl", function ManageAdminCtrl($scope, User) {
    $scope.userId = "";
    
    $scope.search = function () {
        if($scope.userId) {
            User.getByRegistration($scope.userId).then(function success(response) {
                $scope.searchedUser = response.data;
            }, function error(response) {
                console.log(response);
            });
        }
    };

});