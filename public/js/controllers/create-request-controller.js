angular.module('mufcg')
.controller('CreateRequestCtrl', function ($scope, AuthService, Request) {
    loadRequests();

    $scope.create = function() {
        Request.create(AuthService.getCurrentUser().id, $scope.description, $scope.priority).then( function () {
            alert('Solicitação criada');
        }, function (err) {
            alert('Falha');
        });
    }

    function loadRequests () {
        Request.getByAuthor(AuthService.getCurrentUser().id).then( function (requests) {
            $scope.requests = requests;
        });
    }
});