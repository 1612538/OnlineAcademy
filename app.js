const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const createError = require('http-errors');
const exphbs = require('express-handlebars');
const passport = require('./utils/passport');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser("somesecret"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./controllers/AccountController'));

app.use('/management/main-categories', loggedInAsAdmin, require('./controllers/CategoriesController'));
app.use('/management/courses', loggedInAsAdmin, require('./controllers/CoursesController'));


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

function loggedInAsAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 3) {
        next();
    } else {
        res.redirect('/login');
    }
}

function loggedInAsTeacher(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 2) {
        next();
    } else {
        res.redirect('/login');
    }
}

function loggedInAUser(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 1) {
        next();
    } else {
        res.redirect('/login');
    }
}