var expect = require('chai').expect;
var assert = require('chai').assert;
var checkLoginMW = require('../middleware/auth/checkLogin');

describe('checkLogin middleware', function () {
    it('should not redirect to login as I am signed in', function (done) {
        var req = {
            session : {
                user: 'testUser'
            },
            cookies : {
                user_sid: 'id'
            }
        };
        var res = {
            locals: {
                user: 'definitelyNotTestUser'
            },
            redirect: function (where) {
                assert.fail("this should never been called");
            }
        };
        checkLoginMW(req, res, function (err) {
            expect(res.locals.user).to.eql('testUser');
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should redirect to login as I am not signed in', function (done) {
        var req = {
            session : {
                user: undefined
            },
            cookies : {
                user_sid: undefined
            }
        };
        var res = {
            redirect: function (where) {
                expect(where).to.eql('/login');
                done();
            }
        };
        checkLoginMW(req, res, function (err) {
            assert.fail("this should never been called here");
        });
    });
});
