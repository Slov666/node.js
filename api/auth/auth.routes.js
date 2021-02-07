const { Router } = require("express");
const { asyncWrapper } = require("../helpers/asyncWrapper");

const authRouter = Router();
const { authValidateMiddleware } = require("./auth.validateMiddleware");
const { registration, login, logout, verifyEmail } = require("./auth.controllers");
const authvalidTokenMiddleware = require("./auth.validTokenMiddleware");

authRouter.post(
  "/register",
  authValidateMiddleware,
  asyncWrapper(registration)
);
authRouter.post("/login", asyncWrapper(login));
authRouter.post("/logout", authvalidTokenMiddleware, asyncWrapper(logout));
authRouter.get("/verify/:verificationToken", asyncWrapper(verifyEmail));
module.exports = authRouter;
