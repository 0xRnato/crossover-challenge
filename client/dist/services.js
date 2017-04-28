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
            logout: _logout
        };

        return service;

        function _logout(sessionId) {
            return $http.get('/user/logout', { params: { sessionId: sessionId } });
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

        function _userAuth(user) {
            user.password = md5.createHash(user.password);
            return $http.post('/user/auth', user);
        }
    }
})();