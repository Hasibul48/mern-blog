require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connection is successfully established!"))
    .catch((err) => console.log(err.message));

const userSignupSchema = mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name must be at least 5 characters long'],
        maxlength: [15, 'Name cannot exceed 15 characters'],
        validate: {
            validator: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: 'Name can only contain alphabetic characters and spaces'
        }
    },
    email: {
        trim: true,
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true, minLength: 8 }
}, { timestamps: true });

const userSingupModel = mongoose.model('user', userSignupSchema);

module.exports = userSingupModel;