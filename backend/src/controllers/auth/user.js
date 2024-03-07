const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../../models/auth/User');
const jwt = require("jsonwebtoken")
// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please provide username, email, and password' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Could not create user', details: error.message });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and Password"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });

        res.status(200).json({message:"Login Success", token });
    } catch (error) {
        res.status(500).json({ error: 'Could not log in', details: error.message });
    }
}

module.exports = { createUser, userLogin}



