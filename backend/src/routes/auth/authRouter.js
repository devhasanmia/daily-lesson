const express = require('express');
const { createUser, userLogin } = require('../../controllers/auth/user');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);


module.exports = router;