const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');
const bcrypt = require('../utils/bcrypt');

router.get('/management', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    console.log(req.user);
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

router.get('/myAccount', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    res.render('myAccount', {
        title: 'Online Academy - My Account',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        user: req.user,
        message: req.query.message,
        layout: 'main'
    });
});

router.post('/myAccount/editInformation', async(req, res) => {
    if (req.user.type === 3) {
        const entity = {
            username: req.body.username,
            password: await bcrypt.hashPassword(req.body.password),
        }
        const row = await admins.updateByEntity(entity);
    } else {
        const entity = {
            username: req.body.username,
            password: await bcrypt.hashPassword(req.body.password),
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
        if (req.user.type === 2) {
            user.workplace = req.body.workplace;
            const row = await teachers.updateByEntity(entity);
        } else {
            const row = await users.updateByEntity(entity);
        }
    }
    return res.redirect('/myAccount?message=Account Updated');
})

router.get('/mainboard1', async(req, res) => {
    const cats = await cat.all();
    const smallcats = await smallcat.all();
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

router.get('/mainboard2', async(req, res) => {
    const cats = await cat.all();
    const smallcats = await smallcat.all();
    if (req.isAuthenticated() && req.user.type === 2) {
        res.render('teacher', {
            title: 'Online Academy - Mainboard',
            cats: cats,
            smallcats: smallcats,
            layout: 'teacher'
        })
    } else
        res.redirect('/');
});

module.exports = router;