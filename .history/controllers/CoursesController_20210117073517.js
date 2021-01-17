const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const courses = require('../models/Courses');
const Categories = require('../models/Categories');
const Small_Categories = require('../models/Small_Categories');
const Teachers = require('../models/Teachers');

router.get('/', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        const cats = await Cat.all();
        const smallcats = await SmallCat.all();
        const allcourses = await courses.all();
        res.render('admin', {
            cats: cats,
            smallcats: smallcats,
            title: 'Online Academy - Courses',
            courses: allcourses,
            layout: 'admin'
        });
    } else res.redirect('/login');
})

router.get('/SmallCatID=:id', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        const cats = await Categories.all();
        const smallcats = await Small_Categories.all();
        let id = parseInt(req.params.id);
        const smallcat = Small_Categories.getById(id);
        const allcourses = await courses.getByCatID(id);
        for (let course of allcourses) {
            course.teacherName = await Teachers.getById(course.teacher).name;
        }
        res.render('admin_courses', {
            cats: cats,
            smallcats: smallcats,
            title: 'Courses' + smallcat.name,
            courses: allcourses,
            layout: 'courses'
        });
    } else res.redirect('/login');
})

module.exports = router;