(function () {
    'use strict';

    angular
        .module('app')
        .directive('playing', playing);

    playing.$inject = [];

    function playing() {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element[0].addEventListener("playing", function () {
                scope.$apply(attrs.playing);
            });
        }
    }

})();