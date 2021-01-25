const { Router } = require("express");
const { asyncWrapper } = require("../helpers/asyncWrapper");

const authValidateToken = require("../auth/auth.validTokenMiddleware");
const { updateMiddleware } = require("./user.updateMiddleware");
const { getUser, updateUser } = require("./users.controllers.js");

const userRouter = Router();

userRouter.use(authValidateToken);
userRouter.get("/current", asyncWrapper(getUser));
userRouter.patch("/", updateMiddleware, asyncWrapper(updateUser));

module.exports = userRouter;
