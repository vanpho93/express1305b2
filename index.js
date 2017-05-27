const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.set(express.static('public'));



app.listen(3000);