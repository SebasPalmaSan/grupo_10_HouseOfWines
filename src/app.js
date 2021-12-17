const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('port', process.env.PORT || 3080);
app.listen(3080, () => console.log("listening on port http://localhost:" + app.set('port')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/home.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/login/', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/detalle', (req, res) => res.sendFile(path.resolve(__dirname, './views/detalle.html')));
app.get('/carrito', (req, res) => res.sendFile(path.resolve(__dirname, './views/carrito.html')));