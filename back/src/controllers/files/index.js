"use strict";

/*
El fichero INDEX es el primero que se llama cuando requerimos una carpeta directamente en cualquier módulo, en él se requiren los modulos por separado y son exportados
para su uso en el fichero de rutas fileRoutes.js
*/

const makeFolder = require("./makeFolder");
const getCurrentFolder = require("./getCurrentFolder");
const listDirectory = require("./listDirectory");
const changeDirectory = require("./changeDirectory");
const deleteDirectory = require("./deleteDirectory");
const renameDirectory = require("./renameDirectory");
const uploadFile = require("./uploadFile");
const moveFile = require("./moveFile");
const deleteFile = require("./deleteFile");
const downloadfile = require("./downloadFile");
const renameFile = require("./renameFile");
const moveToTrash = require("./moveToTrash");
const recoverFile = require("./recoverFile");
const emptyTrash = require("./emptyTrash");

module.exports = {
  makeFolder,
  getCurrentFolder,
  listDirectory,
  changeDirectory,
  deleteDirectory,
  renameDirectory,
  uploadFile,
  moveFile,
  deleteFile,
  downloadfile,
  renameFile,
  moveToTrash,
  recoverFile,
  emptyTrash,
};
