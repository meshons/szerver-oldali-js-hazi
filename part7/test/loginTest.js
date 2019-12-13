let expect = require('chai').expect;
let assert = require('chai').assert;
let loginMW = require('../middleware/auth/login');

const {User} = require('../database/db');
let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

describe('login middleware', async function () {
    before(async function () {
        let hash = bcrypt.hashSync('testPassword', parseInt(process.env.SALT_ROUNDS));
        await User.findOne({username: 'testUser' }).then(async function (user) {
            if (!user) {
                await User.create({
                    username: 'testUser',
                    password: hash
                });
            }
        });
    });

    it('should log me in', function (done) {
        var req = {
            body: {
                username: 'testUser',
                password: 'testPassword'
            },
            session: {
                user: undefined
            }
        };
        var res = {
            redirect: function (where) {
                assert.fail("this should never been called");
                done();
            }
        };

        loginMW(req, res, function (err) {
            expect(req.session.user).to.eql('testUser');
            done();
        });
    });

    it('should redirect to login cause user not exist', function (done) {
        var req = {
            body: {
                username: 'notExistingUser',
                password: 'testPassword'
            },
            session: {
                user: undefined
            }
        };
        var res = {
            redirect: function (where) {
                expect(where).to.eql('/login');
                done();
            }
        };

        loginMW(req, res, function (err) {
            assert.fail("this should never been called");
            done();
        });
    });

    it('should redirect to login cause password not correct', function (done) {
        var req = {
            body: {
                username: 'testUser',
                password: 'notTheTestPassword'
            },
            session: {
                user: undefined
            }
        };
        var res = {
            redirect: function (where) {
                expect(where).to.eql('/login');
                done();
            }
        };

        loginMW(req, res, function (err) {
            assert.fail("this should never been called");
            done();
        });
    });
});
