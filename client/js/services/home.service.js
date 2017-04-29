(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('HomeService', HomeService)

    HomeService.$inject = ['$http'];

    function HomeService($http) {
        var service = {
            logout: _logout,
            loadVideos: _loadVideos
        };

        return service;

        function _logout(_sessionId) {
            return $http.get('/user/logout', { params: {
                sessionId: _sessionId }
            });
        }

        function _loadVideos(_sessionId, _skip, _limit) {
            return $http.get('/videos', { params: {
                sessionId: _sessionId,
                skip: _skip,
                limit: _limit }
            });
        }
    }
})();