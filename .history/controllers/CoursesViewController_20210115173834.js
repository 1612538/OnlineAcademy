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

router.get('/catID=:id', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
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
        title: 'Online Academy - ' + currentCat.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        category: currentCat.name,
        layout: 'main'
    });
});

router.get('/catID=:id/smallcatID=:scatid', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const currentCat = await smallcat.getById(req.params.scatid);
    res.render('coursesViewByCat', {
        title: 'Online Academy - ' + currentCat.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        category: currentCat.name,
        layout: 'main'
    });
});

router.get('/detail/courseid=:id', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    //const course = await Courses.getById(req.params.id);
    res.render('coursesDetail', {
        title: 'Online Academy - ', // + course.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        ratedata: 4.1,
        datetime: layout: 'main'
    });
});

function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.write(today);
}

module.exports = router;