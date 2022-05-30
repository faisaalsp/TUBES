import express, { query } from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';

const PORT = 8080;
const app = express();

const publicPath = path.resolve('public');
app.use(express.static(publicPath));

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));

app.get('/logAdmin', async(req, res) => {
    res.render('logAdmin', {

    });
});
app.get('/admin', async(req, res) => {
    res.render('admin', {

    });
});

app.get('/asset', async(req, res) => {
    res.render('asset', {

    });
});

app.listen(PORT, () => {
    console.log(`Server is ready, listening on port ${PORT}`);
});