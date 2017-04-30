(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController)

    LoginController.$inject = [
        'LoginService',
        '$mdToast',
        '$location',
        '$rootScope',
        '$document'
    ];

    function LoginController(
        LoginService,
        $mdToast,
        $location,
        $rootScope,
        $document
    ) {
        const vm = this;

        vm.login = () => {
            vm.dataLoading = true;
            LoginService.userAuth(angular.copy(vm.user)).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        const userSession = {
                            username: response.data.username,
                            sessionId: response.data.sessionId
                        }
                        $rootScope.userSession = userSession;
                        $mdToast.show($mdToast.simple().textContent('Welcome ' + userSession.username));
                        $location.path('/home');
                    } else {
                        $mdToast.show($mdToast.simple().textContent(response.data.error));
                        vm.user = {};
                        const input = $document[0].getElementById('usernameForm');
                        input.focus();
                        vm.dataLoading = false;
                    }
                },
                function errorCallback(response) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Status error: ' + response.status + ' - ' + response.statusText)
                    );
                    vm.user = {};
                    const input = $document[0].getElementById('usernameForm');
                    input.focus();
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