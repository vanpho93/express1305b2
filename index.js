const express = require('express');
// const parser = require('body-parser').urlencoded({ extended: false });
const upload = require('./uploadConfig');
const { getAllGirls, getGirlById, getNextGirl, getBackGirl, addNewGirl } = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    getAllGirls((err, girls) => {
        if (err) return res.send(err.toString());
        res.render('home', { mang: girls });
    });
});

app.get('/admin', (req, res) => res.render('admin'));

app.get('/show/:id', (req, res) => {
    const { id } = req.params;
    getGirlById(id, (err, girl) => {
        if (err) return res.send(err.toString());
        res.render('show', { hotGirl: girl });
    });
});

app.get('/next/:id', (req, res) => {
    const { id } = req.params;
    getNextGirl(id, (err, girl) => {
        if (err) return res.send(err.toString());
        res.render('show', { hotGirl: girl });
    });
});

app.get('/back/:id', (req, res) => {
    const { id } = req.params;
    getBackGirl(id, (err, girl) => {
        if (err) return res.send(err.toString());
        res.render('show', { hotGirl: girl });
    });
});

app.post('/admin/add', upload.single('hinhHotGirl'), (req, res) => {
    const { name, age } = req.body;
    addNewGirl(name, req.file.filename, age, err => {
        if (err) return res.send(err.toString());
        res.redirect('/');
    }); 
});

app.use((err, req, res, next) => {
    res.send(err.toString());
});

app.listen(process.env.PORT || 3000);

class HotGirl {
    constructor(name, age, image) {
        this.name = name;
        this.age = age;
        this.image = image;
    }
}

const arrHotGirl = [
    new HotGirl('Ely Tran', 18, '1.jpg'),
    new HotGirl('Ha Ho', 30, '2.jpg')
];
