angular.module('mufcg')
.controller('RegisterCtrl', function ($scope, $state, AuthService, Location, messagebox) {
    $scope.user = {};

    function loadCampi() {
        Location.getCampi().then(function (res) {
            $scope.campi = res.data;
        });
    }

    loadCampi();

    $scope.register = function() {
        if ($scope.user.password !== $scope.confirmPassword) {
            alert('Senhas divergem!');
        } else {
            $scope.user.role = "student";
            AuthService.register($scope.user).then(function () {
                messagebox.success('Usuário cadastrado com sucesso');
                $state.go("login");
            }, function error(response) {
                messagebox.fail(response.data.message);
            });
        }
    };
});