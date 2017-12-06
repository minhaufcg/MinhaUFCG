angular.module('mufcg')
.controller('MapModalCtrl', function ($scope, NgMap, messagebox, $uibModalInstance, mapHelper, AuthService) {
    var map = undefined;
    var ufcgPolygon = undefined;

    NgMap.getMap().then(function(mapResult) {
        map = mapResult;

        google.maps.event.trigger(map, "resize");
        mapHelper.initMap(map,AuthService.getCurrentUser());

        mapHelper.deleteAllMarkers();
    });


    $scope.createMarker = function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        if (!google.maps.geometry.poly.containsLocation(event.latLng, mapHelper.getPolygon())) {
            messagebox.fail('O local que você escolheu para criar a ocorrência fica fora das dependências do seu campus','Local inválido')
        }
        else {
            if (mapHelper.getMarkers().length > 0)
                mapHelper.deleteAllMarkers();

            var marker = new google.maps.Marker();
            marker.setMap(map);
            marker.setPosition(event.latLng);
            marker.setTitle("Nova ocorrência");

            mapHelper.addMarker(marker);

            setMarker(lat, lng, false);
        }

    };

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var posFun = {
                    lat: function () { return position.coords.latitude },
                    lng: function () { return position.coords.longitude }
                };

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if (!google.maps.geometry.poly.containsLocation(posFun, mapHelper.getPolygon())) {
                    messagebox.fail("Você não está no campus, não é possível marcar esta localização", "Local inválido");
                }
                else {
                    map.setCenter(pos);

                    var marker = new google.maps.Marker();
                    marker.setMap(map);
                    marker.setPosition(pos);

                    setMarker(pos.lat, pos.lng, true);
                    mapHelper.addMarker(marker);
                }
            }, function () {
                messagebox.fail("Você bloqueou o acesso da aplicação a sua localização. " +
                                "Sem sua permissão não será possível a atualização de funcionalidades com geolocalização." +
                                "<br><br><a target='_blank' href='/'>Clique aqui para saber como desbloquear</a>")
            });
        }
    };

    $scope.dragLimit = function() {
        mapHelper.dragEnd(mapHelper.getPolygon());
    };

    function setMarker(lat, lng, geolocation) {
        $scope.marker = {
            lat : lat,
            lng : lng,
            geolocation : geolocation
        }
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.marker);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});