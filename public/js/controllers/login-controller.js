angular.module('mufcg')
.controller('LoginCtrl', function ($scope, User, authService, messagebox, $location){
    $scope.auth = function () {
        User.auth($scope.registration, $scope.password).then(function (res) {
            authService.setCurrentUser(res.data);
            $location.url("/home");
        }, function (err) {
            messagebox.fail("Matrícula ou senha incorretos");
        });
    }
});