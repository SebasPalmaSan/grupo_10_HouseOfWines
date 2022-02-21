const path = require("path");
const express = require("express");
const method = require('method-override');
const app = express();
const session = require('express-session');
const cookie = require('cookie-parser');
const multer = require ('multer');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');



app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public/')));
app.use(express.static(path.resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: true}));  // req.body en los formularios
app.use(method('m')); // ?m=PUT || ?m=DELETE


app.listen(app.get('port'), () => console.log('Listen in http://localhost:' + app.get('port')));



app.use(cookie()); // req.cookies //res.cookie('name', 'value', {expires: new Date(Date.now())})
app.use(session({secret:'HOW', resave: false, saveUninitialized: true})); //req.session

app.use(userLoggedMiddleware);
app.use('/', require('./routes/main'));
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));
app.use('/carrito', require('./routes/cart'));


//app.use(express.json());
//app.use('/file/', require('./routes/file'));
//app.use('/detail', require('./routes/detail'));
//app.use('/files', require('./routes/file'));