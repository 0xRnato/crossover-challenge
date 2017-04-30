describe('Login Service', function () {
    var LoginService, httpBackend, responseData;
    var username = 'ali';
    var password = '5f4dcc3b5aa765d61d8327deb882cf99';

    beforeEach(angular.mock.module('angular-md5'));
    beforeEach(angular.mock.module('app.login'));

    beforeEach(inject(function (_LoginService_) {
        LoginService = _LoginService_;
    }));

    it('should exist', function () {
        expect(LoginService).toBeDefined();
    });

    describe('.userAuth()', function () {

        beforeEach(inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            httpBackend.when('POST', '/user/auth').respond(200, {
                status: 'success',
                username: 'ali'
            });
        }));

        afterEach(function(){
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should exist', function () {
            expect(LoginService.userAuth).toBeDefined();
        });

        it('shoul return a promisse', function () {
            var result = LoginService.userAuth({username, password});
            httpBackend.expectPOST('/user/auth');
            httpBackend.flush();
        });

        it('shoul return success', function () {
            var result = LoginService.userAuth({username, password}).then(function(data){
                responseData = data;
            });
            httpBackend.flush();
            expect(responseData.data.status).toEqual('success');
        });
    })
});