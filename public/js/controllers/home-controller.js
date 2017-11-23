angular.module('mufcg')
.controller('HomeCtrl', function ($scope, NgMap, mapHelper, LOCATIONS, AuthService, Request) {
    var map = undefined;
    var ufcgPolygon = undefined;

    $scope.initMap = function () {
        NgMap.getMap().then(function (mapResult) {
            map = mapResult;

            if (!mapHelper.getMap())
                mapHelper.initMap(map);

            mapHelper.deleteAllMarkers();

            ufcgPolygon = mapHelper.getPolygon(LOCATIONS.UFCG.polygon);

            loadAuthorRequests();
        });
    };

    $scope.dragLimit = function () {
        mapHelper.dragEnd(ufcgPolygon, LOCATIONS.UFCG.center);
    };

    function loadAuthorRequests() {
        Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
            res.data.forEach(function (request) {
                var location = {};
                if ('location' in request) {
                    location.lat = request.location.lat;
                    location.lng = request.location.lng;
                    createMarker(request.title, request.description, undefined, request.createdOn, location);
                }
            });
        });
    }

    function createMarker(title, description, image, date, location) {
        var contentString = '<h1>' + title + '</h1>' +
            '<p>' + description + '</p>' +
            '<img src="' + image + '" style="height: 100px; width : auto" alt=""><br>' +
            '<p>' + date + '</p>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker();
        marker.setMap(map);
        marker.setPosition(location);
        marker.setTitle(title);

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        mapHelper.addMarker(marker);
    }
});