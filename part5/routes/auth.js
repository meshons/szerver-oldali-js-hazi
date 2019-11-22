let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

const {check} = require('express-validator');
const {User} = require('../database/db');


router.get('/login', auth.redirectLogged);
router.get('/login', function (req, res, next) {
    res.render('login', req.query);

});

router.post(
    '/login',
    [
        check('username').not().isEmpty().withMessage('usernameEmpty'),
        check('password').not().isEmpty().withMessage('passwordEmpty'),
    ],
    auth.login
);

router.post('/login', function (req, res, next) {
    res.redirect('/beers');
});

router.post(
    '/registration',
    [
        check('username').not().isEmpty().withMessage('usernameEmpty').custom(
            async function (value) {
                let user = await User.find({username: value});
                if (user.length !== 0) {
                    return Promise.reject();
                }
            }
        ).withMessage('usernameExists'),
        check('password').not().isEmpty().withMessage('passwordEmpty')
            .isLength({min: 8}).withMessage('passwordShort'),
        check('re-password').not().isEmpty().withMessage('rePasswordEmpty')
            .isLength({min: 8}).withMessage('rePasswordShort').bail()
            .custom((value, {req}) => value === req.body.password).withMessage('passwordNoMatch')
    ],
    auth.registration)
;

router.post('/registration', function (req, res, next) {
    res.redirect('/beers');
});

router.get('/registration', auth.redirectLogged);
router.get('/registration', function (req, res, next) {
    res.render('registration', req.query);
});

router.get('/logout', auth.logout);

module.exports = router;