(function () {
  angular.module('mufcg')
    .service('mapHelper', function (NgMap) {
      var markers = [];
      var map;
      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      return {
        initMap: function (markersMap) {
          map = markersMap;
        },
        getMap: function () {
          return map;
        },
        addMarker: function (marker) {
          markers.push(marker);
        },
        getMarkers: function () {
          return markers;
        },
        hideMarkers: function () {
          clearMarkers();
        },
        showAllMarkers: function () {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        },
        deleteAllMarkers: function () {
          clearMarkers();
          markers = [];
        },
        getPolygon: function (coords) {
          return new google.maps.Polygon({ paths: coords });
        },
        dragEnd: function (polygon, center) {
          if (!google.maps.geometry.poly.containsLocation(map.getCenter(), polygon))
            map.setCenter(center);
        }
      };
    });
})();