const express = require('express');
const userRouter = express.Router();
const profileRouter = express.Router();

const userController = require('./controllers/user.controller');
const profileController = require('./controllers/profile.controller');

const verifyToken = require('./middlewares/verifyToken');
const verifyPermission = require('./middlewares/verifyPermission');

userRouter.get('/', [verifyToken, verifyPermission(['view_users'])], userController.getAll);
// userRouter.get('/active', verifyToken, userController.getAllActive);
userRouter.get('/id/:userId', [verifyToken, verifyPermission(['view_users'])], userController.getById);
userRouter.get('/email/:email', [verifyToken, verifyPermission(['view_users'])], userController.getByEmail);
userRouter.post('/', [verifyToken, verifyPermission(['create_users'])], userController.create);
userRouter.post('/login', userController.login);
userRouter.put('/id/:userId', [verifyToken, verifyPermission(['change_users'])], userController.update);
userRouter.delete('/id/:userId', [verifyToken, verifyPermission(['delete_users'])], userController.delete);


profileRouter.get('/', [verifyToken, verifyPermission(['view_profiles'])], profileController.getAll);
profileRouter.get('/id/:profileId', [verifyToken, verifyPermission(['view_profiles'])], profileController.getById);
profileRouter.post('/', [verifyToken, verifyPermission(['create_profiles'])], profileController.create);
// profileRouter.patch('/changePermission/id/:profileId', verifyToken, profileController.create);
profileRouter.put('/id/:profileId', [verifyToken, verifyPermission(['change_profiles'])], profileController.update);
profileRouter.delete('/id/:profileId', [verifyToken, verifyPermission(['delete_profiles'])], profileController.delete);

module.exports = { user: userRouter, profile: profileRouter };
