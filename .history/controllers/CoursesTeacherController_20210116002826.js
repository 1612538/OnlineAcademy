const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');
const bcrypt = require('../utils/bcrypt');
const Courses = require('../models/Courses');

router.get('/makeCourse', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const currentCat = await cat.getById(req.params.id);
    res.render('coursesViewByCat', {
        title: 'Online Academy - ' + currentCat.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: req.user.username,
        category: currentCat.name,
        layout: 'main'
    });
});