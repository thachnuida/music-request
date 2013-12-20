angular.module('mean.songs').controller('SongsController', ['$scope', '$routeParams', '$location', 'Global', 'Songs', function ($scope, $routeParams, $location, Global, Songs) {
    $scope.global = Global;

    $scope.create = function() {
        var song = new Songs({
            title: this.title,
            url: this.url
        });
        song.$save(function(response) {
            $location.path("songs/" + response._id);
        });

        this.title = "";
        this.url = "";
    };

    $scope.remove = function(song) {
        if (song) {
            song.$remove();  

            for (var i in $scope.songs) {
                if ($scope.songs[i] == song) {
                    $scope.songs.splice(i, 1);
                }
            }
        }
        else {
            $scope.song.$remove();
            $location.path('songs');
        }
    };

    $scope.update = function() {
        var song = $scope.song;
        if (!song.updated) {
            song.updated = [];
        }
        song.updated.push(new Date().getTime());

        song.$update(function() {
            $location.path('songs/' + song._id);
        });
    };

    $scope.find = function() {
        Songs.query(function(songs) {
            $scope.songs = songs;
        });
    };

    $scope.findOne = function() {
        Songs.get({
            songId: $routeParams.songId
        }, function(song) {
            $scope.song = song;
        });
    };
}]);