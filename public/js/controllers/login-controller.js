angular.module('mufcg')
.controller('LoginCtrl', function ($scope, User, authService, $location){
    $scope.auth = function () {
        User.auth($scope.registration, $scope.password).then(function (res) {
            authService.setCurrentUser(res.data);
            alert("Bem vindo " + authService.getCurrentUser().name.split(" ")[0]);
            $location.url("/home");
        }, function (err) {
            alert("Login ou senha incorreto");
        });
    }
});