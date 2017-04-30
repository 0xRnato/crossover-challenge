describe('Home Controller', function () {
    var $controller, $rootScope, HomeController, HomeService;
    var video = {
        average: 3.05,
        description: "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
        goldStars: 3,
        grayStars: 1,
        halfStars: true,
        name: "[0] Getting Started With ReactJs",
        rattings: [1, 5, 5, 4, 3, 4, 2, 5, 5, 2, 3, 2, 2, 4, 2, 1, 2, 3, 3, 3],
        stars: [{ icon: 'star' }, { icon: 'star' }, { icon: 'star' }, { icon: 'star_half' }, { icon: 'star_border' }],
        url: "videos/Getting_Started_With_React.js.mp4",
        _id: "590141a50bf31c3dcc5ce8eb"
    }

    beforeEach(angular.mock.module('ngMaterial'));
    beforeEach(angular.mock.module('app.home'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _HomeService_) {
        $controller = _$controller_;
        HomeService = _HomeService_;
        $rootScope = _$rootScope_;

        $rootScope.userSession = {
            username: 'ali',
            sessionId: 'e96pFzmk1CfYxmHMnT3fR0dD3bLC0Iym'
        };

        HomeController = $controller('HomeController');
    }));

    it('should be defined', function () {
        expect(HomeController).toBeDefined();
    });

    it('should initialize with username: ali on the rootScope', function () {
        expect($rootScope.userSession.username).toEqual('ali');
    });

    it('should initialize with sessionId: e96pFzmk1CfYxmHMnT3fR0dD3bLC0Iym on the rootScope', function () {
        expect($rootScope.userSession.sessionId).toEqual('e96pFzmk1CfYxmHMnT3fR0dD3bLC0Iym');
    });
});