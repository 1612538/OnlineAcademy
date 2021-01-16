const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');
const bcrypt = require('../utils/bcrypt');

router.get('/catID=:id', async(req, res) => {
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
    const currentCat = await cat.getById(req.params.id);
    res.render('coursesViewByCat', {
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