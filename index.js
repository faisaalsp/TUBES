import express, { query } from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';

const PORT = 8080;
const app = express();

const publicPath = path.resolve('public');
app.use(express.static(publicPath));

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));

// Connect ke DB
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tubes'
});

const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if(err){
                reject(err);
            }
            else{
                resolve(conn);
            }
        })
    })
}

// Query
const getSkripsi = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Skripsi JOIN Dosen ON Skripsi.NIK = Dosen.NIK', (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getManageTopik = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Skripsi JOIN Dosen ON Skripsi.NIK = Dosen.NIK', (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getManageAkun = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Dosen', (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

// Halaman
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
    const conn = await dbConnect();
    let result = await getSkripsi(conn)
    conn.release();
    res.render('adminDasboard', {
        result
    });
    console.log(result)
});

app.get('/adminManageTopik', async(req, res) => {
    const conn = await dbConnect();
    let result = await getManageTopik(conn)
    conn.release();
    res.render('adminManageTopik', {
        result
    });
    console.log(result)
});

app.get('/adminManageAkun', async(req, res) => {
    const conn = await dbConnect();
    let result = await getManageAkun(conn)
    conn.release();
    res.render('adminManageAkun', {
        result
    });
    console.log(result)
});

app.get('/adminUpload', async(req, res) => {
    res.render('adminUpload', {

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

app.get('/dosenLogin', async(req, res) => {
    res.render('dosenLogin', {

    });
});

app.get('/dosenDasboard', async(req, res) => {
    const conn = await dbConnect();
    let result = await getSkripsi(conn)
    conn.release();
    res.render('dosenDasboard', {
        result
    });
    console.log(result)
});

app.get('/dosenUpload', async(req, res) => {
    res.render('dosenUpload', {

    });
});

app.get('/dosenBrowse', async(req, res) => {
    res.render('dosenBrowse', {

    });
});

app.get('/dosenManageTopik', async(req, res) => {
    res.render('dosenManageTopik', {

    });
});

app.get('/dosenReview', async(req, res) => {
    res.render('dosenReview', {

    });
});

app.get('/adminReview', async(req, res) => {
    res.render('adminReview', {

    });
});

app.get('/mahasiswaLogin', async(req, res) => {
    res.render('mahasiswaLogin', {

    });
});

app.get('/mahasiswaDasboard', async(req, res) => {
    res.render('mahasiswaDasboard', {

    });
});

app.get('/mahasiswaBrowse', async(req, res) => {
    res.render('mahasiswaBrowse', {

    });
});

app.listen(PORT, () => {
    console.log(`Server is ready, listening on port ${PORT}`);
});