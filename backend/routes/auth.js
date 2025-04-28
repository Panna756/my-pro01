const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuthFields = require('../middlewares/checkAuthFields');

router.post('/signin', checkAuthFields, authController.signin);
router.post('/login', checkAuthFields, authController.login);

module.exports = router;