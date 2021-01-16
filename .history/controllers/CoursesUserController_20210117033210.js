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
const upload = require('../utils/multer');
const FavoriteCourses = require('../models/FavoriteCourses');
const EnrolledCourses = require('../models/EnrolledCourses');

router.get('/FavoriteCourses', async(req, res) => {

});

router.get('/EnrolledCourses', async(req, res) => {

});

router.post('/addFavorite/idcourses=:id', async(req, res) => {
    const newFavorite = {
        iduser: iduser,
        idcourses: req.params.id,
    }
    const rs = await FavoriteCourses.add(newFavorite);
    res.redirect('/detail/courseid=' + req.params.id);
});

router.post('/addEnrolled/idcourses=:id', async(req, res) => {
    const newEnrolled = {
        iduser: iduser,
        idcourses: req.params.id,
    }
    const course = await Courses.getById(req.params.id);
    const rs = await EnrolledCourses.add(newEnrolled);
    res.redirect('/detail/courseid=' + req.params.id);
});

module.exports = router;