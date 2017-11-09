angular.module('mufcg')
.controller('CreateRequestCtrl', function ($scope, authService, Request) {
    $scope.create = function() {
        Request.create(authService.getCurrentUser()._id, $scope.description, $scope.priority).then( function () {
            alert('Solicitação criada');
        }, function (err) {
            alert('Falha');
        });
    }
});