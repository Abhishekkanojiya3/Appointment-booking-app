const express = require('express');
const userController = require('../controllers/userControllers');
const userAuthenticationController = require('../middleware/jwttoken')


const router = express.Router();

router.post('/appointments', userAuthenticationController.authenticateUser, userController.addUser);
router.get('/appointments', userAuthenticationController.authenticateUser, userController.getAllUsers);
router.get('/appointments/:id', userAuthenticationController.authenticateUser, userController.getUser);
router.put('/appointments/:id', userAuthenticationController.authenticateUser, userController.updateUser);
router.delete('/appointments/:id', userAuthenticationController.authenticateUser, userController.deleteUser);


module.exports = {
    routes: router
}