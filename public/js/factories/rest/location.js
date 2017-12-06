angular.module("mufcg").factory('Location', function RequestFactory($http, PROPERTIES) {
    return {
        getCampi : function () {
            return $http.get(PROPERTIES.restBasePath + "/campi");
        },

        getCampusCoords : function (campusId) {
            return $http.get(PROPERTIES.restBasePath + "/campi/" + campusId + "/coords/");
        }
    }
});