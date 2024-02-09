const express = require('express');
const userRouter = express.Router();

const userController = require('./controllers/user.controller');

const verifyToken = require('./middlewares/verifyToken');

// router.get("/", authController.auth);
userRouter.get('/', verifyToken, userController.getAll);
userRouter.get('/id/:userId', verifyToken, userController.getById);
userRouter.get('/email/:email', verifyToken, userController.getByEmail);

userRouter.post('/', verifyToken, userController.create);
userRouter.post('/login', userController.login);

module.exports = { user: userRouter };
