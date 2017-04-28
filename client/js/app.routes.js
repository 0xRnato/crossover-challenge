(function(){
    'use strict';

    angular
        .module('app.routes')
        .config(RoutesConfig)

    RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesConfig($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginController',
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeController',
            })
            .when('/detail', {
                templateUrl: 'views/detail.html',
                controller: 'DetailController',
                controllerAs: 'detailController',
            })
            .otherwise({redirectTo: '/home'});
    }

}());