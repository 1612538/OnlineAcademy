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

router.get('/CreateCourse', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();

    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }

    res.render('coursesCreate', {
        title: 'Online Academy - Create Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: req.user.username,
        layout: 'main'
    });
}).post('/CreateCourse', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();

    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }

    const course = {
        name: req.body.nameInput,
        price: req.body.priceInput,
        idsmall_category: req.body.categoryInput,
        rate: 0,
        ratevotes: 0,
        teacher: req.user.id,
        description1: req.body.briefDesc,
        description2: req.body.detailDesc,
        lastupdate: currentDate(),
        isCompleted: 0,
    }
    const row = await Courses.add(course);

    res.render('coursesCreate', {
        title: 'Online Academy - Create Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: req.user.username,
        layout: 'main'
    });
})

function currentDate() {
    var date = new Date();
    var dateStr =
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2) + " " +
        ("00" + date.getDate()).slice(-2) + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear();
    return dateStr;
}

module.exports = router;