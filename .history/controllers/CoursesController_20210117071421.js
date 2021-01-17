const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const courses = require('../models/Courses');
const smallcategories = require('../models/Small_Categories');
const Small_Categories = require('../models/Small_Categories');

router.get('/', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        const allcourses = await courses.all();
        res.render('admin', {
            title: 'Online Academy - Courses',
            courses: allcourses,
            layout: 'admin'
        });
    } else res.redirect('/login');
})

router.get('/SmallCatID=:id', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        let id = parseInt(req.params.id);
        const smallcat = Small_Categories.getById(id);
        const allcourses = await courses.getByCatID(id);
        res.render('admin_courses', {
            title: 'Courses' + smallcat.name,
            courses: allcourses,
            layout: 'courses'
        });
    } else res.redirect('/login');
})

module.exports = router;