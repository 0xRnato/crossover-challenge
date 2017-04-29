(function () {
    'use strict';

    angular
        .module('app')
        .directive('onScroll', onScroll);

    onScroll.$inject = [];

    function onScroll() {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var raw = element[0];

            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attrs.onScroll);
                }
            });
        }
    }

})();