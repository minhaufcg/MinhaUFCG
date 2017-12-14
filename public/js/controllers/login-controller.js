angular.module('mufcg')
.controller('LoginCtrl', function ($scope, User, AuthService, $state, messagebox){

    $scope.login = function () {
        var credentials = {
            registration: $scope.registration,
            password: $scope.password
        };        
        AuthService.login(credentials).then(function success(response) {
            $state.go("home");
        }, function error(response) {
            messagebox.fail("Matrícula ou senha incorretas");
        });
    };
});