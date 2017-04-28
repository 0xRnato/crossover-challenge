'use strict';

(function () {
    'use strict';

    angular.module('app.detail').controller('DetailController', DetailController);

    DetailController.$inject = ['DetailService'];

    function DetailController(DetailService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {}
    }
})();
(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', '$rootScope', '$mdToast', '$location'];

    function HomeController(HomeService, $rootScope, $mdToast, $location) {
        var vm = this;

        vm.logout = function () {
            vm.dataLoading = true;
            HomeService.logout(angular.copy(vm.userSession.sessionId)).then(function sucessCallback(response) {
                if (response.data.status == 'success') {
                    delete $rootScope.userSession;
                    $mdToast.show($mdToast.simple().textContent('Bye'));
                    $location.path('/login');
                } else {
                    $mdToast.show($mdToast.simple().textContent(response.data.error));
                    vm.dataLoading = false;
                }
            }, function errorCallback(response) {
                $mdToast.show($mdToast.simple().textContent('Status error: ' + response.status + ' - ' + response.statusText));
                vm.dataLoading = false;
            });
        };

        activate();

        function activate() {
            vm.userSession = $rootScope.userSession;
            vm.dataLoading = false;
        }
    }
})();
(function () {
    'use strict';

    angular.module('app.login').controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$mdToast', '$location', '$rootScope'];

    function LoginController(LoginService, $mdToast, $location, $rootScope) {
        var vm = this;

        vm.login = function () {
            vm.dataLoading = true;
            LoginService.userAuth(angular.copy(vm.user)).then(function sucessCallback(response) {
                if (response.data.status == 'success') {
                    var userSession = {
                        username: response.data.username,
                        sessionId: response.data.sessionId
                    };
                    $rootScope.userSession = userSession;
                    $mdToast.show($mdToast.simple().textContent('Signed in Successfully'));
                    $location.path('/home');
                } else {
                    $mdToast.show($mdToast.simple().textContent(response.data.error));
                    vm.dataLoading = false;
                    vm.user = {};
                }
            }, function errorCallback(response) {
                $mdToast.show($mdToast.simple().textContent('Status error: ' + response.status + ' - ' + response.statusText));
                vm.user = {};
                vm.dataLoading = false;
            });
        };

        activate();

        function activate() {
            vm.dataLoading = false;
        }
    }
})();