const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('port', 3000);
app.listen(3000, () => console.log("listening on port http://localhost:" + app.set('port')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/home.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/sign-in/', (req, res) => res.sendFile(path.resolve(__dirname, './views/sign-in.html')));