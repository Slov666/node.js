const { Router } = require("express");
const { asyncWrapper } = require("../helpers/asyncWrapper");

const authValidateToken = require("../auth/auth.validTokenMiddleware");
const { updateMiddleware } = require("./user.updateMiddleware");
const { getUser, updateUser, updateAvatar } = require("./users.controllers.js");
const minifyImage = require("../helpers/minify.image");
const upload = require("../helpers/multer.config");

const userRouter = Router();

userRouter.use(authValidateToken);
userRouter.get("/current", asyncWrapper(getUser));
userRouter.patch("/", updateMiddleware, asyncWrapper(updateUser));
userRouter.patch(
  "/avatars",
  upload.single("avatar"),
  minifyImage,
  asyncWrapper(updateAvatar)
);


module.exports = userRouter;
