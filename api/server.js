const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const contactsRouter = require("./contacts/contacts.routes");

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:300" }));
    this.server.use(morgan('dev'))
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () =>
      console.log(`Server started at port ${process.env.PORT}`)
    );
  }
};
