const express = require('express');
const session = require ('express-session');
const cookies = require ('cookie-parser');
const path = require('path');
const method = require('method-override');
const app = express();

app.use(session ({
    secret: "sshh, it's a secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(cookies);
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');

app.set('views', path.resolve(__dirname, './views'));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log('Listen un http://localhost:' + app.get('port')));
app.use(express.static(path.resolve(__dirname, '../public/')));


app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: true}));
//app.use(express.json());

app.use(method('m')); // ?m=PUT || ?m=DELETE



app.use(require('./routes/main'));
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));
app.use('/carrito', require('./routes/cart'));
app.use('/file/', require('./routes/file'));
//app.use('/detail', require('./routes/detail'));
//app.use('/files', require('./routes/file'));
