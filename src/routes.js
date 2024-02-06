const express = require('express');
const userRouter = express.Router();

const userController = require('./controllers/user.controller');

const verifyToken = require('./middlewares/verifyToken');

// router.get("/", authController.auth);
userRouter.post('/', verifyToken, userController.create);
userRouter.get('/', verifyToken, userController.getAll);
userRouter.post('/login', userController.login);

module.exports = { user: userRouter };
