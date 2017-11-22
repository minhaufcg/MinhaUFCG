angular.module('mufcg')
.controller('RegisterCtrl', function ($scope, $state, User, AuthService) {
    
    $scope.register = function() {
        if ($scope.user.password !== $scope.confirmPassword) {
            alert('Senhas divergem!');
        } else {
            $scope.user.role = "student";
            AuthService.register($scope.user).then(function () {
                alert('Usuário cadastrado com sucesso');
                $state.go("login");
            }, function error(response) {
                console.warn(response.message);
            });
        }
    };
});