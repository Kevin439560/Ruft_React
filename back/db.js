const{ Pool } = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'RUFT',
    password:'**********',
    port:5432
});

module.exports = pool;
