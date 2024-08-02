const UserSignupModel = require("../models/users.model");

const bcrypt = require("bcrypt");
const saltRounds = 9;

const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("Required input fields cannot remain empty!");
        }
        const trimdPassword = password && password.trim();
        if (!trimdPassword || /^\s+$/.test(trimdPassword)) {
            return res.status(400).send("Password cannot be empty or contain only spaces")
        }

        const hashedPassword = await bcrypt.hash(trimdPassword, saltRounds);

        const newUser = new UserSignupModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save() && res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const userLogin = async (req, res) => {

    try {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json('Email or Password Cannot be Empty!');
        }

        const requestedUser = await UserSignupModel.findOne({ email });

        if (!requestedUser) {
            return res.status(400).json("User Not Found!");
        }

        // Compare the password
        bcrypt.compare(password, requestedUser.password, function (err, result) {
            if (err) {
                return res.status(500).json("Error comparing passwords");
            }

            if (result) {
                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully!"
                });
            } else {
                return res.status(400).json("Password didn't match!");
            }
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }


}

module.exports = { userSignup, userLogin };
