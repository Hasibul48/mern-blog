const express = require('express');
const { userSignup, userLogin } = require('../controllers/users.controller');


const userRouter = express.Router();

userRouter.post('/signup', userSignup)
userRouter.post('/login', userLogin)

module.exports = userRouter;