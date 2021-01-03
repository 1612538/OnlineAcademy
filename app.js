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


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Online Academy',
        layout: 'main'
    });
})

app.use('/account', require('./controllers/AccountController'));
app.use('/categories', require('./controllers/CategoriesController'));
app.use('/account/management/courses', require('./controllers/CoursesController'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));