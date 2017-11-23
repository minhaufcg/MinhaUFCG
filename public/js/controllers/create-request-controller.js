angular.module('mufcg')
.controller('CreateRequestCtrl', function ($scope, AuthService, Request, $uibModal, messagebox, $location) {
    //authService.getCurrentUser()._id
    $scope.create = function() {
        Request.create(AuthService.getCurrentUser().id, $scope.request).then( function () {
            messagebox.success('Solicitação cadastrada com sucesso',undefined,creationCallback());
        }, function (err) {
            messagebox.fail('Ocorreu um erro na criação da solicitação');
        });
    };

    function creationCallback() {
        $location.url("/home");
    }

    $scope.pop = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/components/map-modal.html',
            controller: 'MapModalCtrl',
            scope : this,
            size: 'xl'
        });

        modalInstance.result.then(function (marker) {
            $scope.request.location.lat = marker.lat;
            $scope.request.location.lng = marker.lng;
            $scope.request.location.geolocation = marker.geolocation;
        });
    };
});