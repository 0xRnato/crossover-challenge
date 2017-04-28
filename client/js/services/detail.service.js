(function(){
    'use strict';

    angular
        .module('app.detail')
        .factory('DetailService', DetailService)

    DetailService.$inject = ['$http'];

    function DetailService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();