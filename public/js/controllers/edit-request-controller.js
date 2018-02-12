angular.module('mufcg')
.controller('EditRequestCtrl', function ($scope, $state, $window, AuthService, Request, $uibModal, messagebox, $location) {
    function init() {
        var list = JSON.parse($window.localStorage.getItem('requests'));
        $scope.request = list.filter(req => req._id === $state.params.id)[0];
    }
    
    (function main() {
        init();
    })();

    $scope.save = function() {
        if (verifyRequest()) {

            Request.edit(AuthService.getCurrentUser().id, $scope.request).then(function () {
                messagebox.success('Solicitação editada com sucesso', undefined, creationCallback());
            }, function (err) {
                messagebox.fail('Ocorreu um erro na edição da solicitação');
            });
            
        }
    };

    $scope.getLocation = function () {
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

    function creationCallback() {
        $location.url("/home");
    }

    function verifyRequest() {
        let fileSizeLimit = 1048576; // 1MB
        let imageValid = ($scope.request.img) ? $scope.request.img.filesize <= fileSizeLimit: true;
        return $scope.request.title && $scope.request.location && 
            $scope.request.location.lat && $scope.request.location.lng;
    }
});