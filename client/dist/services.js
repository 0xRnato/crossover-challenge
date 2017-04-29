'use strict';

(function () {
    'use strict';

    angular.module('app.detail').factory('DetailService', DetailService);

    DetailService.$inject = ['$http'];

    function DetailService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
})();
(function () {
    'use strict';

    angular.module('app.home').factory('HomeService', HomeService);

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
(function () {
    'use strict';

    angular.module('app.login').factory('LoginService', LoginService);

    LoginService.$inject = ['$http', 'md5'];

    function LoginService($http, md5) {
        var service = {
            userAuth: _userAuth
        };

        return service;

        function _userAuth(_user) {
            _user.password = md5.createHash(_user.password);
            return $http.post('/user/auth', _user);
        }
    }
})();