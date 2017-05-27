const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const arrHotGirl = require('./model/HotGirl');

app.get('/', (req, res) => res.render('home', { mang: arrHotGirl }));

app.listen(3000);