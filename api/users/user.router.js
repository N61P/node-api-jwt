const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/validate.token");

router.post('/', createUser);
router.get('/', checkToken, getAllUsers);
router.get('/:userId', checkToken, getUserById);
router.patch('/', checkToken, updateUserById);
router.delete('/', checkToken, deleteUserById);
router.post('/login', login);

module.exports = router;