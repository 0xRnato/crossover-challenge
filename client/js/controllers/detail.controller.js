(function(){
    'use strict';

    angular
        .module('app.detail')
        .controller('DetailController', DetailController)

    DetailController.$inject = ['DetailService'];

    function DetailController(DetailService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();