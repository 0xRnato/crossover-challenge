(function () {
    'use strict';

    angular
        .module('app')
        .directive('onScroll', onScroll);

    onScroll.$inject = [];

    function onScroll() {
        const directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            let raw = element[0];

            element.bind('scroll', () => {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attrs.onScroll);
                }
            });
        }
    }

})();