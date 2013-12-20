angular.module('mean.songs').controller('PlayController', ['$scope', '$routeParams', '$location', 'Global', 'Songs', function ($scope, $routeParams, $location, Global, Songs) {
  $scope.global = Global;
  $scope.songPlaying = {};

  var audioPlayer = $('#audio-player');

  $scope.init = function() {
    $scope.play();
      
    // Add event listening to player
    audioPlayer.on('ended', function(){
      // Play next song
      $scope.play();
    });

  }

  $scope.play = function() {
    Songs.query(function(songs) {
      $scope.songs = songs;

      if ($scope.songs.length) {
          $scope.songPlaying = $scope.songs[0];
          audioPlayer.attr('src', $scope.songPlaying.realLink)         

          // Update to server
          $scope.songPlaying.isPlay = true;    
          $scope.songPlaying.$update();

          // Remove this song
          
          $scope.songs.splice(0, 1);
        }
    });
  }

  $scope.findOne = function() {
    Songs.get({
      songId: $routeParams.songId
    }, function(song) {
      $scope.song = song;
    });
  };
}]);
