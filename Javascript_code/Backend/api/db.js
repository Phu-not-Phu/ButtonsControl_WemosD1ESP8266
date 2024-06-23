'use strict';

const MY_SQL = require('mysql2');

const DB = MY_SQL.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'danghomp69',
    database: process.env.DB_NAME || 'game_iot'
});

module.exports = DB;