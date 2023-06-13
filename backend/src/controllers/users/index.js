'use strict';
const { newUser } = require('./newUser');
const { getUser } = require('./getUser');
const { loginController } = require('./loginController');


module.exports = {
    newUser,
    getUser,
    loginController,
}