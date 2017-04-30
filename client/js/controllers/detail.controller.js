(function () {
    'use strict';

    angular
        .module('app.detail')
        .controller('DetailController', DetailController)

    DetailController.$inject = [
        'DetailService',
        '$rootScope',
        '$mdToast',
        '$location',
        '$mdSidenav',
        '$route',
        '$document'
    ];

    function DetailController(
        DetailService,
        $rootScope,
        $mdToast,
        $location,
        $mdSidenav,
        $route,
        $document
    ) {
        const vm = this;
        let count;
        vm.stars = [1, 2, 3, 4, 5];
        vm.userRate;

        vm.getSelectedStar = () => {
            if (angular.isDefined(vm.userRate)) {
                return vm.userRate + " Stars";
            } else {
                return "Please choose a rating";
            }
        };

        vm.saveRate = () => {
            vm.ratingLoading = true;
            DetailService.rateVideo(angular.copy(vm.userSession.sessionId), vm.video._id, vm.userRate).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        $mdToast.show($mdToast.simple().textContent('Your rating has been saved'));
                        vm.ratingLoading = false;
                    } else {
                        $mdToast.show($mdToast.simple().textContent(response.data.error));
                        vm.ratingLoading = false;
                    }
                }, function errorCallback(response) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Status error: ' + response.status + ' - ' + response.statusText)
                    );
                    vm.ratingLoading = false;
                }
            );
        };

        vm.logout = () => {
            vm.dataLoading = true;
            DetailService.logout(angular.copy(vm.userSession.sessionId)).then(
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

        vm.loadVideo = (_id) => {
            vm.dataLoading = true;
            DetailService.loadVideo(angular.copy(vm.userSession.sessionId), _id).then(
                function sucessCallback(response) {
                    if (response.data.status == 'success') {
                        vm.video = response.data.data;
                        const ratings = vm.video.ratings;
                        let sum = 0;
                        ratings.forEach((rating) => {
                            sum += rating;
                        });
                        vm.video.average = sum / ratings.length;
                        vm.video.goldStars = Math.floor(vm.video.average);
                        vm.video.halfStars = ((vm.video.average === vm.video.goldStars) ? false : true);
                        vm.video.grayStars = ((vm.video.halfStars) ? 4 - vm.video.goldStars : 5 - vm.video.goldStars);
                        vm.video.stars = [];
                        for (let i = 0; i < vm.video.goldStars; i++) {
                            vm.video.stars.push({
                                icon: 'star'
                            });
                        }
                        if (vm.video.halfStars) {
                            vm.video.stars.push({
                                icon: 'star_half'
                            });
                        }
                        for (let i = 0; i < vm.video.grayStars; i++) {
                            vm.video.stars.push({
                                icon: 'star_border'
                            });
                        }
                        vm.dataLoading = false;
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

        vm.loadMore = () => {
            vm.dataLoading = true;
            DetailService.loadVideos(angular.copy(vm.userSession.sessionId), count, 10).then(
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
            const video = $document[0].getElementById(_id);
            if (video.paused)
                video.play();
            else
                video.pause();
        };

        vm.backToHome = () => {
            $location.path('/home');
        };

        vm.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return () => {
                $mdSidenav(componentId).toggle();
            };
        }

        vm.openVideo = (_id) => {
            $rootScope.videoId = _id;
            $route.reload();
        };

        activate();


        function activate() {
            vm.userSession = $rootScope.userSession;
            vm.videos = [];
            count = 0;
            vm.loadVideo(angular.copy($rootScope.videoId));
            vm.loadMore();
        }
    }
})();