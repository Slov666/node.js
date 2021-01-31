const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();
const contactsRouter = require("./contacts/contacts.routes");
const authRouter = require("./auth/auth.routes");
const userRouter = require("./users/users.routers");
const url = process.env.MONGO_URL;

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    await this.initDB();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }
  async initDB() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log("Start up error:", err);
      process.exit(1);
    }
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000" }));
    this.server.use(morgan("dev"));
    this.server.use(express.static("public"));
    this.server.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  }

  initRoutes() {
    this.server.use("/api/auth", authRouter);
    this.server.use("/api/contacts", contactsRouter);
    this.server.use("/api/users", userRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () =>
      console.log(`Server started at port ${process.env.PORT}`)
    );
  }
};
