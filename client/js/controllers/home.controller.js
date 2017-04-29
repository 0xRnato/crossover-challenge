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

        vm.userSession = $rootScope.userSession;
        vm.videos = [];
        var count = 0;
        vm.loadMore = function () {
            vm.dataLoading = true;
            HomeService.loadVideos(angular.copy(vm.userSession.sessionId), count, 10).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        if (response.data.data.length > 0) {
                            var _videos = response.data.data;
                            _videos.forEach(function (video) {
                                var ratings = video.ratings;
                                var sum = 0;
                                ratings.forEach(function (rating) {
                                    sum += rating;
                                });
                                video.average = sum / ratings.length;
                                video.goldStars = Math.floor(video.average);
                                video.halfStars = ((video.average === video.goldStars) ? false : true);
                                video.grayStars = ((video.halfStars) ? 4 - video.goldStars : 5 - video.goldStars);
                                video.stars = [];
                                for (var i = 0; i < video.goldStars; i++) {
                                    video.stars.push({
                                        icon: 'star'
                                    });
                                }
                                if (video.halfStars) {
                                    video.stars.push({
                                        icon: 'star_half'
                                    });
                                }
                                for (var i = 0; i < video.grayStars; i++) {
                                    video.stars.push({
                                        icon: 'star_border'
                                    });
                                }
                            });
                            _videos.forEach(function (newVideo) {
                                vm.videos.push(newVideo);
                            });
                            vm.dataLoading = false;
                            count += 10;
                        } else {
                            vm.dataLoading = false;
                        }
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
        };
        vm.loadMore();

        activate();

        function activate() {}
    }
})();