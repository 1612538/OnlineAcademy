const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Online Academy - Sign In',
        message: null,
        layout: 'account'
    });
}).post('/login', passport.authenticate('local', {
    failWithError: true,
    successRedirect: '/'
}), (err, req, res, next) => {
    return res.render('login', {
        title: 'Online Academy - Sign In',
        message: 'Incorrect username or password',
        layout: 'account'
    })
});

router.get('/create', (req, res) => {
    res.render('signup', {
        title: 'Online Academy - Sign Up',
        disp: 'none',
        layout: 'account'
    });
})

router.get('/secret', (req, res) => {
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        res.send('Đã đăng nhập');
    } else {
        res.redirect('/account/login');
    }
});



module.exports = router;