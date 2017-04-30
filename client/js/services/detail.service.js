(function () {
    'use strict';

    angular
        .module('app.detail')
        .factory('DetailService', DetailService)

    DetailService.$inject = ['$http'];

    function DetailService($http) {
        var service = {
            logout: _logout,
            loadVideos: _loadVideos,
            loadVideo: _loadVideo,
            rateVideo: _rateVideo
        };

        return service;

        function _logout(_sessionId) {
            return $http.get('/user/logout', {
                params: {
                    sessionId: _sessionId
                }
            });
        }

        function _loadVideos(_sessionId, _skip, _limit) {
            return $http.get('/videos', {
                params: {
                    sessionId: _sessionId,
                    skip: _skip,
                    limit: _limit
                }
            });
        }

        function _loadVideo(_sessionId, _videoId) {
            return $http.get('/video', {
                params: {
                    sessionId: _sessionId,
                    videoId: _videoId
                }
            });
        }

        function _rateVideo(_sessionId, _videoId, _rating) {
            return $http.post('/video/ratings', {
                videoId: _videoId,
                rating: _rating
            },
            {
                method: 'POST',
                url: '/video/ratings',
                params: {
                    sessionId: _sessionId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})();