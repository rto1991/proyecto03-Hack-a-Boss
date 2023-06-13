'use strict';

const listFiles = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'En pruebas'
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    listFiles,
}