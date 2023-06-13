'use strict';
const mysql = require('mysql2/promise');
require('dotenv').config();

const { HOST, USERS, PASSWORD, DATABASE } = process.env;

let pool;


const getConnection = async () => {
    if(!pool){
        pool = mysql.createPool({
            connectionLimit: 10,
            host: HOST,
            user: USERS,
            password: PASSWORD,
            database: DATABASE,
            timezone: 'Z',
        });
    }
    return await pool.getConnection();

}

module.exports = {
    getConnection,
};