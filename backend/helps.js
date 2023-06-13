'use strict';

const newError = (message, status) => {
const error = new Error(message);
        error.httpStatus = status;
        throw error;
    };


module.exports = {
    newError,
}
