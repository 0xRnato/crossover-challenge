(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController)

    HomeController.$inject = [
        'HomeService',
        '$rootScope',
        '$mdToast',
        '$location',
        '$document'
    ];

    function HomeController(
        HomeService,
        $rootScope,
        $mdToast,
        $location
    ) {
        const vm = this;
        let count;

        vm.logout = () => {
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

        vm.loadMore = () => {
            vm.dataLoading = true;
            HomeService.loadVideos(angular.copy(vm.userSession.sessionId), count, 10).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        if (response.data.data.length > 0) {
                            const _videos = response.data.data;
                            _videos.forEach((video) => {
                                const ratings = video.ratings;
                                let sum = 0;
                                ratings.forEach((rating) => {
                                    sum += rating;
                                });
                                video.average = sum / ratings.length;
                                video.goldStars = Math.floor(video.average);
                                video.halfStars = ((video.average === video.goldStars) ? false : true);
                                video.grayStars = ((video.halfStars) ? 4 - video.goldStars : 5 - video.goldStars);
                                video.stars = [];
                                for (let i = 0; i < video.goldStars; i++) {
                                    video.stars.push({
                                        icon: 'star'
                                    });
                                }
                                if (video.halfStars) {
                                    video.stars.push({
                                        icon: 'star_half'
                                    });
                                }
                                for (let i = 0; i < video.grayStars; i++) {
                                    video.stars.push({
                                        icon: 'star_border'
                                    });
                                }
                            });
                            _videos.forEach((newVideo) => {
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

        vm.playVideo = (_id) => {
            const video = $document.getElementById(_id);
            if (video.paused)
                video.play();
            else
                video.pause();
        };

        vm.pauseOthers = (_id) => {
            const vid = $document.getElementsByTagName('video');
            for (let key = 0; key < vid.length; key++) {
                let video = vid[key];
                if (video.id != _id) {
                    video.pause();
                }
            }
        };

        vm.openVideo = (_id) => {
            $rootScope.videoId = _id;
            $location.path('/detail');
        };

        activate();

        function activate() {
            vm.userSession = $rootScope.userSession;
            vm.videos = [];
            count = 0;
            vm.loadMore();
        }
    }
})();