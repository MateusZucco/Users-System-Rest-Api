var express = require("express");
var userRouter = express.Router();

const userController = require("./controllers/user.controller");

// router.get("/", authController.auth);
userRouter.post("/", userController.create);
userRouter.post('/login', userController.login);

module.exports = { user: userRouter };
