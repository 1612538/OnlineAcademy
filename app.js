const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const createError = require('http-errors');
const exphbs = require('express-handlebars');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
    defaultLayout: 'main',
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

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Online Academy',
    });
})

app.use('/categories', require('./controllers/CategoriesController'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));