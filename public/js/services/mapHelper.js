angular.module('mufcg')
.service('mapHelper', function (NgMap, Location) {
    var markers = [];
    var map = undefined;
    var campusCenter = undefined;
    var coords = undefined;
    var polygon = undefined;

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    return {
        initMap : function (markersMap, user) {
            map = markersMap;

            Location.getCampusCoords(user.campus).then(function (res) {
                map.setCenter(res.data.center);
                campusCenter = res.data.center;
                coords = res.data.coords;
                polygon = new google.maps.Polygon({paths: coords});
            });
        },
        getCampusCenter : function () {
            return campusCenter;
        },
        getMap : function () {
            return map;
        },
        addMarker : function (marker) {
            markers.push(marker);
        },
        getMarkers : function () {
            return markers;
        },
        hideMarkers : function () {
            clearMarkers();
        },
        showAllMarkers : function () {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        },
        deleteAllMarkers : function () {
            clearMarkers();
            markers = [];
        },
        getPolygon : function () {
            return polygon;
        },
        dragEnd : function (center) {
            if(!google.maps.geometry.poly.containsLocation(map.getCenter(), polygon))
                map.setCenter(center);
        }
    }
});