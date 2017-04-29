(function () {
    'use strict';

    angular.module('app', [
        'ngRoute',

        'app.routes',
        'app.login',
        'app.home',
        'app.detail',

        'ngMaterial',
        'ngMdIcons',
        'angular-md5',
    ]);

    angular.module('app.routes', []);
    angular.module('app.login', []);
    angular.module('app.home', []);
    angular.module('app.detail', []);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(mainConfig)

    mainConfig.$inject = ['$mdThemingProvider'];

    function mainConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey');
    }

}());

(function () {
    'use strict';

    angular
        .module('app')
        .run(runBlock)

    runBlock.$inject = ['$rootScope', '$location'];

    function runBlock($rootScope, $location) {
        // FIXME:
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $location.path() != '/login';
            var loggedIn = $rootScope.userSession;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
}());
