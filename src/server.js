require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const chalk = require("chalk");

const responseFormat = require("./core/response-format");
const applyAuthMiddleware = require("./core/middlewares/auth");

const initRoutes = require("./routes");
const log = console.log;

let app = express();
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

applyAuthMiddleware(app);
initRoutes(app);

app.use((error, req, res, next) => {
  response = responseFormat.wrap(error, 200, "failure", "Unhandled error occurred.", null);
  res.status(response.code).json(response);
});

const server = http.createServer(app);
const port = process.env.PORT;
const env = process.env.NODE_ENV;
server.listen(port, () => log(chalk.green.bold(`\nUsing environment: ${env}\nServer running on port ${port}\n`)));

module.exports = app;
