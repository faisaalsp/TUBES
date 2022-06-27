import express, { query } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path, { resolve } from 'path';
import mysql from 'mysql';

const PORT = 8080;
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

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
const getLogin = (conn, user, pass) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Dosen WHERE username = '${user}' AND pass = '${pass}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

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
        conn.query('SELECT * FROM Skripsi JOIN Dosen ON Skripsi.NIK = Dosen.NIK WHERE Skripsi.NIK = 1', (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getManageTopik2 = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT Judul, Tipe FROM Skripsi WHERE NIK = 1', (err, result) => {
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


// Halaman Login
app.get('/asset', async(req, res) => {
    res.render('asset', {

    });
});

app.get('/login', async(req, res) => {
    res.render('login', {

    });
});

// ADMIN
app.post('/adminDasboard', async(req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const conn = await dbConnect();
    const login = await getLogin(conn, user, pass)
    conn.query(`SELECT * FROM Dosen WHERE username = '${user}' AND pass = '${pass}'`, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            req.session.loggedin = true;
            req.session.username = user;
            req.session.nama = result[0].namaDosen;
            req.session.status = result[0].statusDosen;
            if(result[0].statusDosen == "Administrator"){
                res.redirect('/adminDasboard')
            }
            else if(result[0].statusDosen == "Dosen"){
                res.redirect('/dosenDasboard')
            }
        }
        else{
            res.send("Maaf username atau password salah")
        }
        res.end();
    })
});

app.get('/adminDasboard', async(req, res) => {
    const conn = await dbConnect();
    let result = await getSkripsi(conn)
    const nama = req.session.nama;
    const status = req.session.status;
    conn.release();
    res.render('adminDasboard', {
        result, nama, status
    });
});

app.get('/adminManageTopik', async(req, res) => {
    const conn = await dbConnect();
    let result = await getManageTopik(conn)
    conn.release();
    res.render('adminManageTopik', {
        result
    });
});

app.post('/adminManageTopik', async(req, res) => {
    const conn = await dbConnect();
    conn.release();
    const tipe = req.body.tipe;
    if(tipe){
        conn.query(`UPDATE Skripsi SET status = '${tipe}' WHERE status = '${tipe}'`, (err) => {
            if(err) throw err;
            res.redirect('/adminManageTopik');
            res.end();
        });
    }
    res.render('adminManageTopik', {
        result
    });
});

app.get('/adminManageAkun', async(req, res) => {
    const conn = await dbConnect();
    let result = await getManageAkun(conn)
    conn.release();
    res.render('adminManageAkun', {
        result
    });
});

app.get('/adminUpload', async(req, res) => {
    res.render('adminUpload', {

    });
});

app.post('/adminUpload', async(req, res) => {
    const conn = await dbConnect();
    conn.release();
    let input = "INSERT INTO Skripsi SET ?";
    let topik = {NIK: req.body.nik, noSkripsi: req.body.nomor, Judul: req.body.judul, BidangPeminatan: req.body.peminatan, Tipe: req.body.tipe}
    conn.query(input, topik, (error, results, fields) => {
        if (error) throw error;
        res.redirect('adminUpload')
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

app.get('/adminReview', async(req, res) => {
    res.render('adminReview', {

    });
});

// DOSEN
app.get('/dosenLogin', async(req, res) => {
    res.render('dosenLogin', {

    });
});

app.get('/dosenDasboard', async(req, res) => {
    const conn = await dbConnect();
    let result = await getSkripsi(conn)
    const nama = req.session.nama;
    const status = req.session.status;
    conn.release()
    res.render('dosenDasboard', {
        result, nama, status
    });
});

app.get('/dosenUpload', async(req, res) => {
    res.render('dosenUpload', {

    });
});

app.post('/dosenUpload', async(req, res) => {
    const conn = await dbConnect();
    conn.release();
    let input = "INSERT INTO Skripsi SET ?";
    let topik = {NIK: req.body.nik, noSkripsi: req.body.nomor, Judul: req.body.judul, BidangPeminatan: req.body.peminatan, Tipe: req.body.tipe}
    conn.query(input, topik, (error, results, fields) => {
        if (error) throw error;
        res.redirect('dosenUpload')
        });
});

app.get('/dosenBrowse', async(req, res) => {
    const conn = await dbConnect();
    let result = await getSkripsi(conn)
    conn.release()
    res.render('dosenBrowse', {
        result
    });
});

app.get('/dosenManageTopik', async(req, res) => {
    const conn = await dbConnect();
    let result = await getManageTopik2(conn)
    res.render('dosenManageTopik', {
        result
    });
});

app.get('/dosenReview', async(req, res) => {
    res.render('dosenReview', {

    });
});

app.listen(PORT, () => {
    console.log(`Server is ready, listening on port ${PORT}`);
});