(function(){
    'use strict';

    angular
        .module('app.login')
        .factory('LoginService', LoginService)

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