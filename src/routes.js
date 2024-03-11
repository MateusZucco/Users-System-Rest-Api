const express = require('express');
const userRouter = express.Router();

const userController = require('./controllers/user.controller');

const verifyToken = require('./middlewares/verifyToken');

userRouter.get('/', verifyToken, userController.getAll);
// userRouter.get('/active', verifyToken, userController.getAllActive);
userRouter.get('/id/:userId', verifyToken, userController.getById);
userRouter.get('/email/:email', verifyToken, userController.getByEmail);
userRouter.post('/', verifyToken, userController.create);
userRouter.post('/login', userController.login);
userRouter.put('/id/:userId', verifyToken, userController.update);
userRouter.delete('/id/:userId', verifyToken, userController.delete);


module.exports = { user: userRouter };
