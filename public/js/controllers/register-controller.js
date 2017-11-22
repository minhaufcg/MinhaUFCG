angular.module('mufcg')
.controller('RegisterCtrl', function ($scope, $location, User, AuthService) {
    
    $scope.register = function() {
        if ($scope.user.password !== $scope.confirmPassword) {
            alert('Senhas divergem!');
        } else {
            $scope.user.role = "student";
            AuthService.register($scope.user).then(function () {
                alert('Usuário cadastrado com sucesso');
                $location.url("/login");
            }, function error(response) {
                console.warn(response.message);
            });
        }
    };
});