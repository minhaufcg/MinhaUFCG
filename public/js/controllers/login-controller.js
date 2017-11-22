angular.module('mufcg')
.controller('LoginCtrl', function ($scope, User, AuthService, $state){

    $scope.login = function() {
        var credentials = {
            registration: $scope.registration,
            password: $scope.password
        };        
        AuthService.login(credentials).then(function success(response) {
            var user = AuthService.getCurrentUser();
            alert("Bem vindo " + user.name);
            $state.go("home");
        }, function error(response) {
            alert("Matrícula ou senha incorreta");
        });
    };
});