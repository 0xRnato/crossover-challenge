(function(){
    'use strict';

    angular
        .module('app.home')
        .factory('HomeService', HomeService)

    HomeService.$inject = ['$http'];

    function HomeService($http) {
        var service = {
            logout: _logout
        };

        return service;

        function _logout(sessionId) {
            return $http.get('/user/logout', {params:{sessionId: sessionId}});
        }
    }
})();