/**
 * @author Sávio Muniz
 */

var BASE_PATH = "api";

angular.module("mufcg").constant('ICONS', {
    status: {
        pending : 'http://maps.google.com/mapfiles/ms/micons/red.png',
        ongoing : 'http://maps.google.com/mapfiles/ms/micons/orange.png',
        done : 'http://maps.google.com/mapfiles/ms/micons/green.png'
    },
    priority: {
        high : 'http://maps.google.com/mapfiles/ms/micons/red.png',
        regular : 'http://maps.google.com/mapfiles/ms/micons/orange.png',
        low : 'http://maps.google.com/mapfiles/ms/micons/green.png',
        unset : 'http://maps.google.com/mapfiles/ms/micons/purple.png'
    },
    category: {
        maintenance : 'http://maps.google.com/mapfiles/ms/micons/red.png',
        security : 'http://maps.google.com/mapfiles/ms/micons/orange.png',
        suggestion : 'http://maps.google.com/mapfiles/ms/micons/yellow.png',
        cleaning : 'http://maps.google.com/mapfiles/ms/micons/green.png',
        others : 'http://maps.google.com/mapfiles/ms/micons/purple.png'
    }
});