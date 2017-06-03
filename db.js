const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'NODE1305',
    user: 'postgres',
    password: 'khoapham',
    max: 100,
    idleTimeoutMillis: 1000
});

// pool.connect((err, client, done) => {
//     if (err) return console.log(err.toString());
//     client.query('SELECT * FROM "HotGirl"', (errQuery, result) => {
//         if (errQuery) return console.log(errQuery);
//         console.log(result.rows);
//         done();
//     });
// });

function queryDB(sql, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err);
        client.query(sql, (errQuery, result) => {
            if (errQuery) return cb(errQuery);
            done(errQuery);
            cb(null, result);
        });
    });
}

function getAllGirls(cb) {
    const sql = 'SELECT * FROM "HotGirl"';
    queryDB(sql, (err, result) => {
        if (err) return cb(err);
        cb(null, result.rows);
    });
}

function getGirlById(id, cb) {
    const sql = 'SELECT * FROM "HotGirl" WHERE id = ' + id;
    queryDB(sql, (err, result) => {
        if (err) return cb(err);
        if (!result.rows[0]) return cb(new Error('Duong dan khong ton tai'));
        cb(null, result.rows[0]);
    });
}

module.exports = { getAllGirls, getGirlById };

// getAllGirls((err, girls) => console.log(girls));

// queryDB('SELECT * FROM "HotGirl"', function(e, r) {
//     if (e) return console.log(e + '');
//     console.log(r);
// });

// function onSuccess(kq) {
//     console.log(kq);
// }

// const arrowSuccess = kq => console.log(kq);

// queryDB('SELECT * FROM "HotGirl"', kq => console.log(kq));

// queryDB('SELECT * FROM "HotGirl"', function() {
//     console.log(kq);
// });

// queryDB('SELECT * FROM "HotGirl"', onSuccess);

// queryDB('SELECT * FROM "HotGirl"', arrowSuccess);

