angular.module('mufcg')
.controller('RegisterCtrl', function ($scope, $location, User) {
    console.log("register");
    $scope.register = function() {
        if ($scope.user.password !== $scope.confirmPassword)
            alert('Senhas divergem!');

        else
            User.register($scope.user.name, $scope.user.identification, $scope.user.password, "student").then(function (data) {
                alert('Usuário cadastrado com sucesso');
                $location.url("/#!/login");
            });
    }
});