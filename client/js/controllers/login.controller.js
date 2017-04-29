(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController)

    LoginController.$inject = ['LoginService', '$mdToast', '$location', '$rootScope'];

    function LoginController(LoginService, $mdToast, $location, $rootScope) {
        var vm = this;

        vm.login = function () {
            vm.dataLoading = true;
            LoginService.userAuth(angular.copy(vm.user)).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        var userSession = {
                            username: response.data.username,
                            sessionId: response.data.sessionId
                        }
                        $rootScope.userSession = userSession;
                        $mdToast.show($mdToast.simple().textContent('Welcome ' + userSession.username));
                        $location.path('/home');
                    } else {
                        $mdToast.show($mdToast.simple().textContent(response.data.error));
                        vm.dataLoading = false;
                        vm.user = {};
                    }
                },
                function errorCallback(response) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Status error: ' + response.status + ' - ' + response.statusText)
                    );
                    vm.user = {};
                    vm.dataLoading = false;
                }
            );
        };

        activate();

        function activate() {
            vm.dataLoading = false;
        }
    }
})();