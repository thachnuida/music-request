angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Songs",
        "link": "songs"
      }, 
      {
          "title": "Request a song",
          "link": "songs/create"
      },      
    ];

    // Add menu for admin
    if (Global.user && Global.user.type == 0) {
      $scope.menu.push({
        "title": "Play songs",
        "link": "songs/play"
      })
    }
    
    $scope.isCollapsed = false;
}]);