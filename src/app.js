const path = require('path');
const express = require('express');
const method = require('method-override');
const session = require('express-session');
const cookie = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(app.get('port'), () => console.log('http://localhost:' + app.get('port')));

app.use(cookie());
app.use(session({secret: 'HOW', resave: false, saveUninitialized: true}));

app.use(require('./middlewares/userLoggedMiddleware'));
app.use('/', require('./routes/homeRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/carrito', require('./routes/carritoRoutes'));
app.use('/api/products', require('./routes/api/apiProducts'));
app.use('/api/users', require('./routes/api/apiUsers'));

//app.use('/file/', require('./routes/fileRoutes'));