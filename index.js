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

app.get('/adminLogin', async(req, res) => {
    res.render('adminLogin', {

    });
});

app.get('/adminComment', async(req, res) => {
    res.render('adminComment', {

    });
});

app.get('/adminDasboard', async(req, res) => {
    res.render('adminDasboard', {

    });
});

app.get('/adminUpload', async(req, res) => {
    res.render('adminUpload', {

    });
});

app.get('/adminManageAkun', async(req, res) => {
    res.render('adminManageAkun', {

    });
});

app.get('/adminManageTimeline', async(req, res) => {
    res.render('adminManageTimeline', {

    });
});

app.get('/adminManageTimeline2', async(req, res) => {
    res.render('adminManageTimeline2', {

    });
});

app.get('/adminManageTopik', async(req, res) => {
    res.render('adminManageTopik', {

    });
});

app.listen(PORT, () => {
    console.log(`Server is ready, listening on port ${PORT}`);
});