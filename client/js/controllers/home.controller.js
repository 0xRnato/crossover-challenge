(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['HomeService', '$rootScope', '$mdToast', '$location'];

    function HomeController(HomeService, $rootScope, $mdToast, $location) {
        var vm = this;

        vm.logout = function () {
            vm.dataLoading = true;
            HomeService.logout(angular.copy(vm.userSession.sessionId)).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        delete $rootScope.userSession;
                        $mdToast.show($mdToast.simple().textContent('Bye'));
                        $location.path('/login');
                    } else {
                        $mdToast.show($mdToast.simple().textContent(response.data.error));
                        vm.dataLoading = false;
                    }
                },
                function errorCallback(response) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Status error: ' + response.status + ' - ' + response.statusText)
                    );
                    vm.dataLoading = false;
                }
            );
        }

        activate();

        function activate() {
            vm.userSession = $rootScope.userSession;
            vm.dataLoading = false;
        }
    }
})();