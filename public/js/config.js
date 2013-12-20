//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/songs', {
            templateUrl: 'views/songs/list.html'
        }).
        when('/songs/create', {
            templateUrl: 'views/songs/create.html'
        }).
        when('/songs/play', {
            templateUrl: 'views/songs/play.html'
        }).
        when('/songs/:songId/edit', {
            templateUrl: 'views/songs/edit.html'
        }).
        when('/songs/:songId', {
            templateUrl: 'views/songs/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);