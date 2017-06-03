const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home', { mang: arrHotGirl }));

app.get('/admin', (req, res) => res.render('admin'));

app.get('/show/:index', (req, res) => {
    const { index } = req.params;
    res.render('show', { hotGirl: arrHotGirl[index], index });
});

app.post('/admin/add', parser, (req, res) => {
    const { name, image, age } = req.body;
    const hotGirl = new HotGirl(name, age, image);
    arrHotGirl.push(hotGirl);
    res.send('Them thanh cong!!!');
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
