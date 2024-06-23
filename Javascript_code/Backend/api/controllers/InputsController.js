'use strict';

const UTIL = require('util');
const DB = require('../db');
const MY_SQL = require('mysql2');
const TABLE = 'inputButt';

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM ' + TABLE;
        DB.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },

    detail: (req, res) => {
        let sql = 'SELECT * FROM ' + TABLE + ' WHERE input = ?';
        DB.query(sql, [req.params.input], (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },

    update: (req, res) => {
        let data = req.body;
        let input = req.params.input;
        let sql = 'UPDATE ' + TABLE + ' SET ? WHERE input = ?';
        DB.query(sql, [data, input], (err, response) => {
            if (err) throw err;
            res.json({ message: 'Update success!' });
        })
    },

    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO ' + TABLE + ' SET ?';
        DB.query(sql, [data], (err, response) => {
            if (err) throw err;
            res.json({ message: 'Insert success!' });
        })
    },

    delete: (req, res) => {
        let sql = 'DELETE FROM ' + TABLE + ' WHERE input = ?';
        DB.query(sql, [req.params.input], (err, response) => {
            if (err) throw err;
            res.json({ message: 'Delete success!' });
        })
    }
};