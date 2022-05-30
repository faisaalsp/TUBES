import express, { query } from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';

const PORT = 8080;
const app = express();

const publicPath = path.resolve('public');
app.use(express.static(publicPath));

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));

app.get('/asset', async(req, res) => {
    res.render('asset', {

    });
});

app.get('/logAdmin', async(req, res) => {
    res.render('logAdmin', {

    });
});

app.get('/dasboardAdmin', async(req, res) => {
    res.render('dasboardAdmin', {

    });
});

app.get('/uploadAdmin', async(req, res) => {
    res.render('uploadAdmin', {

    });
});

app.get('/manageAkunAdmin', async(req, res) => {
    res.render('manageAkunAdmin', {

    });
});

app.get('/manageTimelineAdmin', async(req, res) => {
    res.render('manageTimelineAdmin', {

    });
});

app.get('/manageTopikAdmin', async(req, res) => {
    res.render('manageTopikAdmin', {

    });
});

app.listen(PORT, () => {
    console.log(`Server is ready, listening on port ${PORT}`);
});