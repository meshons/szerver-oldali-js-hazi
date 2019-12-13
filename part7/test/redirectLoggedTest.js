var expect = require('chai').expect;
var assert = require('chai').assert;
var redirectLoggedMW = require('../middleware/auth/redirectLogged');

describe('redirectLogged middleware', function () {
    it('should redirect to beers as I am signed in', function (done) {
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
                expect(where).to.eql('/beers');
                expect(res.locals.user).to.eql('testUser');
                done();
            }
        }
        redirectLoggedMW(req, res, function (err) {
            assert.fail("this should never been called here");
        });
    });

    it('should not redirect to beers as I am not signed in', function (done) {
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
                assert.fail("this should never been called here");
            }
        }
        redirectLoggedMW(req, res, function (err) {
            done();
        });
    });
});
