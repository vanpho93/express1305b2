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

pool.connect((err, client, done) => {
    client.query('SELECT * FROM "HotGirl"', (errQuery, result) => {
        console.log(result.rows);
        done();
    });
});
