const express = require("express");

const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  loginUser,
  modifyPwd,
  validateUser,
  recorverUserPassword,
  resetUserPassword,
} = require("../controllers/user");

const isUser = require("../middlewares/isUser");
const userExists = require("../middlewares/userExists");

const router = express.Router();

router.get("/user/:id", userExists, isUser, getUser); //ver datos de un usuario (cualquiera logueado puede) *probado*
router.post("/newUser", postUser); // nuevo usuario *PROBADO*
router.patch("/updateUser/:id", userExists, isUser, updateUser); //actualizar datos usuario (solo puede modificar los de si mismo si es usuario normal, si es admin puede modificar el que quiera) *probado*
router.delete("/deleteUser/:id", deleteUser);
router.post("/login", loginUser); // login *PROBADO*
router.patch("/users/changePassword/:id", modifyPwd); //modificar contraseña *PROBADO*
router.get("/users/validate/:regCode", validateUser); //validar nuevo usuario *PROBADO*
router.post("/users/recoverPassword", recorverUserPassword); //solicitar código de recuperación por contraseña olvidada *probado*
router.post("/users/resetPassword", resetUserPassword); //canjear el código de recuperación por nueva contraseña *probadp*

module.exports = router;
