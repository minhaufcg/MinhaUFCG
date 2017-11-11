angular.module('mufcg')
.controller('CreateRequestCtrl', function ($scope, authService, Request) {
    loadRequests();

    $scope.create = function() {
        Request.create(authService.getCurrentUser()._id, $scope.description, $scope.priority).then( function () {
            alert('Solicitação criada');
        }, function (err) {
            alert('Falha');
        });
    }

    function loadRequests () {
        Request.getByAuthor(authService.getCurrentUser()._id).then( function (requests) {
            $scope.requests = requests;
        });
    }
});