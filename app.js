require("dotenv").config();

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
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpolad());

// app.use((req, res) => {
//   console.log("----", req.headers);
//   console.log("");
// });

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
