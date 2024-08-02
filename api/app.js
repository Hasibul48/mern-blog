const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users.route');


const app = express();

//jason & urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use(cors())

//user router
app.use('/api/users', userRouter)

//Error Handling Middlware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).send({
        success: false,
        message: err.massage
    });
})
module.exports = app;