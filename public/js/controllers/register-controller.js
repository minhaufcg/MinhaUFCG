angular.module('mufcg')
.controller('RegisterCtrl', function ($scope, User) {
    console.log("register")
    $scope.register = function() {
        if ($scope.user.password !== $scope.confirmPassword)
            alert('Senhas divergem!');

        else
            User.register($scope.user.name, $scope.user.password, $scope.user.identification, "student").then(function (data) {
                console.log('deu certo');
                console.log(data);
            });
    }
});