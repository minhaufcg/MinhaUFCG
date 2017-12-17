angular.module('mufcg')
.controller("ManageAdminCtrl", function ManageAdminCtrl($scope, User, messagebox) {
    $scope.registration = "";
    
    $scope.search = function () {
        if($scope.registration) {
            User.getByRegistration($scope.registration).then(function success(response) {
                $scope.user = response.data;
            }, function error(response) {
                messagebox.fail(
                    `Não foi encontrado nenhum usuário com a matrícula ${$scope.registration}`,
                    'Usuário Não Encontrado'
                );
            });
        }
    };

    $scope.addAdmin = function () {
        User.addAdmin($scope.registration).then(function success() {
            $scope.user.isAdmin = true;
            messagebox.success(
                `O usuário ${$scope.user.name} agora é um administrador do sistema`,
                'Administrador Adicionado'
            );
        });
    };

    $scope.removeAdmin = function () {
        User.removeAdmin($scope.registration).then(function success() {
            $scope.user.isAdmin = false;
            messagebox.success(
                `O usuário ${$scope.user.name} deixou de ser um administrador do sistema`,
                'Administrador Removido'
            );
        });
    }; 
});
