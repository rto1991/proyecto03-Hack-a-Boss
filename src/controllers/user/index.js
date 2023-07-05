const postUser = require("./postUser");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const loginUser = require("./loginUser");
const modifyPwd = require("./modifyPwd");
const validateUser = require("./validateUser");
const recorverUserPassword = require("./recorverUserPassword");
const resetUserPassword = require("./resetUserPassword");

module.exports = {
  postUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  modifyPwd,
  validateUser,
  recorverUserPassword,
  resetUserPassword,
};
