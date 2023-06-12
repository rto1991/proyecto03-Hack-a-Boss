const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fileUpolad = require("express-fileupload");
const cors = require("cors");
const app = express();

//declare static folder
const staticDir = path.join(__dirname, "src/uploads");
app.use(express.static(staticDir));

//use middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpolad());

//use routes
const userRouter = require("./src/routes/userRoutes");
const fileRouter = require("./src/routes/fileRoutes");
app.use(userRouter);
app.use(fileRouter);

// Middleware para rutas no definidas
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(3000, () => console.log("Servidor escuchando en puerto 3000"));
