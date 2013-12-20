//Articles service used for songs REST endpoint
angular.module('mean.songs').factory("Songs", ['$resource', function($resource) {
    return $resource('songs/:songId', {
        songId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);