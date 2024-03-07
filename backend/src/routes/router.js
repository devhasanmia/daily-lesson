const express = require('express');
const authRouter = require('./auth/authRouter');

const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;
