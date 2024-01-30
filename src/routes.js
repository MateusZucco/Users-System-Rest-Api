let express = require("express");
let userRouter = express.Router();

const userController = require("./controllers/user.controller");

// router.get("/", authController.auth);
userRouter.post("/", userController.create);
userRouter.get('/', userController.getAll);
userRouter.post('/login', userController.login);

module.exports = { user: userRouter };
