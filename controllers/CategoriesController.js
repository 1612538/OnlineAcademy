const express = require('express');
const router = express.Router();
const Cat = require('../models/Categories');

router.get('/', async(req, res) => {
    const cats = await Cat.all();
    for (let cat of cats) {
        cat.isActive = false;
    }
    cats[0].isActive = true;
    res.render('home', {
        title: 'Online Academy',
        cats: cats,
    });
})

module.exports = router;