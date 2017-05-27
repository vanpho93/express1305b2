const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const arrHotGirl = require('./model/HotGirl');

app.get('/', (req, res) => res.render('home', { mang: arrHotGirl }));

app.get('/admin', (req, res) => res.render('admin', { isAdmin: false }));

app.get('/show/:index', (req, res) => {
    const { index } = req.params;
    res.render('show', { hotGirl: arrHotGirl[index] });
});

app.listen(3000);