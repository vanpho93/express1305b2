const express = require('express');
// const parser = require('body-parser').urlencoded({ extended: false });
const upload = require('./uploadConfig');
const { getAllGirls } = require('./db');

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

app.get('/show/:index', (req, res) => {
    const { index } = req.params;
    res.render('show', { hotGirl: arrHotGirl[index], index });
});

app.post('/admin/add', upload.single('hinhHotGirl'), (req, res) => {
    const { name, age } = req.body;
    const hotGirl = new HotGirl(name, age, req.file.filename);
    arrHotGirl.push(hotGirl);
    res.send('Them thanh cong!!!');
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
