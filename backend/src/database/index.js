'use strict';

const { getUserId } = require('./getUserId');
const { registerNewUser } = require('./registerNewUser'); 
const { getUserEmail } = require('./getUserEmail');
const { getConnection } = require('./getConnection');

module.exports = {
    registerNewUser,
    getUserId,
    getUserEmail,
    getConnection,
}