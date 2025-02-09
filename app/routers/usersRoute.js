const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', usersController.getAllUsers)
router.get('/count', usersController.getAllUsersCount)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.createUser)
router.delete('/', usersController.deleteUser)
router.put('/', usersController.updateUser)

module.exports = router;