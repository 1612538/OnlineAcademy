const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');

router.get('/', (req, res) => {
    if (req.isAuthenticated())
        if (req.user.type === 3)
            res.redirect('/management');
        else
            res.redirect('/mainboard');
    else {
        res.render('home', {
            title: 'Online Academy',
            layout: 'main'
        });
    }
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Online Academy - Sign In',
        message: null,
        layout: 'account'
    });
}).post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        } else {
            if (!user) {
                return res.render('login', {
                    title: 'Online Academy - Sign In',
                    message: 'Incorrect username or password',
                    layout: 'account'
                })
            } else {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        res.redirect('/');
                    }
                })
            }
        }
    })(req, res, next)
});

router.get('/create', (req, res) => {
    res.render('signup', {
        title: 'Online Academy - Sign Up',
        disp: 'none',
        layout: 'account'
    });
})

router.get('/management', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated() && req.user.type === 3) { //trả về true nếu đã đăng nhập rồi
        res.render('admin', {
            title: 'Online Academy - Management',
            cats: cats,
            smallcats: smallcats,
            layout: 'admin'
        })

    } else
        res.redirect('/');
});

router.get('/mainboard', async(req, res) => {
    const cats = await cat.all();
    let smallcats = [];
    for (let cat of cats) {
        smallcats.push(await smallcat.getByCatId(cat.idcategory));
    }
    if (req.isAuthenticated() && req.user.type === 2) {
        res.render('teacher', {
            title: 'Online Academy - Mainboard',
            cats: cats,
            smallcats: smallcats,
            layout: 'teacher'
        })
    } else
    if (req.isAuthenticated() && req.user.type === 1) {
        res.render('student', {
            title: 'Online Academy - Mainboard',
            cats: cats,
            smallcats: smallcats,
            layout: 'student'
        })
    } else
        res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (!req.user)
        res.redirect('/login');
    else {
        req.logOut();
        res.redirect('/');
    }
})



module.exports = router;