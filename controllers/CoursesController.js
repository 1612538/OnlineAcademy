const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const courses = require('../models/Courses');
const smallcategories = require('../models/Small_Categories');

router.get('/', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        const allcourses = await courses.all();
        res.render('admin', {
            title: 'Online Academy - Courses',
            courses: allcourses,
            layout: 'admin'
        });
    } else res.redirect('/account/login');
})

router.get('/CatID=:idcourses', async(req, res) => {
    if (req.isAuthenticated() && req.user.type == 3) {
        let CatID = parseInt(req.params.idcourses);
        const allcourses = await courses.getByCatID(CatID);
        const cat = smallcategories.getById(CatID);
        res.render('admin_courses', {
            title: 'Courses' + cat.name,
            courses: allcourses,
            layout: 'courses'
        });
    } else res.redirect('/account/login');
})

module.exports = router;