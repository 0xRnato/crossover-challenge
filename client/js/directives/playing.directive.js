(function () {
    'use strict';

    angular
        .module('app')
        .directive('playing', playing);

    playing.$inject = [];

    function playing() {
        const directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element[0].addEventListener("playing", () => {
                scope.$apply(attrs.playing);
            });
        }
    }

})();