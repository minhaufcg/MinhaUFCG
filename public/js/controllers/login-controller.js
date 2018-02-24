angular.module('mufcg')
.controller('LoginCtrl', function ($scope, User, AuthService, $state, messagebox){

    $scope.login = function () {
        var credentials = {
            registration: $scope.registration,
            password: $scope.password
        };        

        AuthService.login(credentials)
            .then(function success(response) {
                $state.go("home");
            }, function error(response) {
                if(response.status == 403) {
                    messagebox.fail("Acesso bloqueado pelo administrador do sistema.");
                } else {
                    messagebox.fail("Matrícula ou senha incorretas");
                }
            });
    };
});