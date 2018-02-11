angular.module('mufcg')
.controller('CreateRequestCtrl', function ($scope, AuthService, Request, $uibModal, messagebox, $location) {
    $scope.create = function() {
        if (verifyRequest()) {

            Request.create(AuthService.getCurrentUser().id, $scope.request).then(function () {
                messagebox.success('Solicitação cadastrada com sucesso', undefined, creationCallback());
            }, function (err) {
                messagebox.fail('Ocorreu um erro na criação da solicitação');
            });
            
        }
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
            scope: this,
            size: 'xl'
        });

        modalInstance.result.then(function (marker) {
            $scope.request.location.lat = marker.lat;
            $scope.request.location.lng = marker.lng;
            $scope.request.location.geolocation = marker.geolocation;
        });
    };

    function verifyRequest() {
        let fileSizeLimit = 1048576; // 1MB
        let imageValid = ($scope.request.img) ? $scope.request.img.filesize <= fileSizeLimit: true;
        return $scope.request.title && $scope.request.location && 
            $scope.request.location.lat && $scope.request.location.lng;
    }
});