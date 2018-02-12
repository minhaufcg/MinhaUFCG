angular.module('mufcg')
.controller('HomeCtrl', function ($scope, NgMap, mapHelper, LOCATIONS, ICONS, AuthService, Request, $filter) {
    var map = undefined;
    var ufcgPolygon = undefined;
    var requests = undefined;

    $scope.initMap = function () {
        NgMap.getMap().then(function (mapResult) {
            map = mapResult;

            mapHelper.initMap(map, AuthService.getCurrentUser());

            loadAuthorRequests();
        });
    };

    // $scope.dragLimit = function () {
    //     mapHelper.dragEnd(ufcgPolygon, LOCATIONS.UFCG.center);
    // };

    function loadAuthorRequests() {
        Request.getByAuthor(AuthService.getCurrentUser().id).then(function (res) {
            requests = res.data;
            displayRequests(requests);
        });
    }

    function createMarker(title, description, image, date, location, icon) {
        var parsedImage = undefined;

        if (image) {
            parsedImage = 'data:'.concat(image.filetype, ';base64,', image.base64);
        }
        var contentString = `
                <h1 style="text-align: center">${title}</h1>
                <h5 style="text-align: center">${$filter('date')(date,'dd/MM/y')}</h5>
                <p>${description}</p>
                <img src="${parsedImage}" style="height: 100px; width : auto" alt=""><br>
                `;

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker();
        marker.setMap(map);
        marker.setPosition(location);
        marker.setTitle(title);

        if (icon)
            marker.setIcon(ICONS[icon.type][icon.value]);


        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        mapHelper.addMarker(marker);
    }

    function displayRequests(requests, filter) {
        requests.forEach(function (request) {
            createMarker(request.title, request.description, request.img, request.createdOn, request.location,
                        filter ? {type : filter.type, value : request[filter.type]} : null);
        });
    }


    $scope.$watchCollection('requestFilter', function (filter) {
        if (!requests)
            return;

        if (filter === 'none') {
            displayRequests(requests);
            return;
        }

        var outputRequests = [];

        if (filter.subType !== 'all') {
            requests.forEach(function (request) {
                if (request[filter.type] === filter.subType)
                    outputRequests.push(request)
            });
        }

        else
            outputRequests = requests;

        mapHelper.deleteAllMarkers();

        displayRequests(outputRequests, filter);
    });
});