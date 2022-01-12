const express = require('express');
const path = require('path');
const method = require('method-override');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log('Listen un http://localhost:' + app.get('port')));


app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
//app.use(express.json());

app.use(method('m')); // ?m=PUT || ?m=DELETE



app.use(require('./routes/main'));
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));