angular.module('mufcg')
.controller("ManageUsersCtrl", function ManageUsersCtrl($scope, User) {
    $scope.users = [ 
        makeUser('Carla da Silva', '12342323'), 
        makeUser('Ricardo Bezerra', '12342323'),
        makeUser('Samira Eloy', '12342323'),
        makeUser('Guz de Sá', '12342323')        
    ];

    function makeUser(name, reg) {
        return {
            name: name,
            registration: reg,
            verification: "untrusted",
            role: "Estudante"
        }
    }

    $scope.block = function (user) {
        user.verification = "rejected";
    }

    $scope.unblock = function (user) {
        user.verification = "untrusted";
    }

    $scope.accept = function (user) {
        user.verification = "trusted";
    }

});