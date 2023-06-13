'use strict';

const { listFiles } = require('./listFiles');
const { newCarpet } = require('./newCarpet');
const { deleteFile } = require('./deleteFile');
const { uploadFileAnonimous } = require('./uploadFileAnonimous');

module.exports = {
    listFiles,
    newCarpet,
    deleteFile,
    uploadFileAnonimous,
};