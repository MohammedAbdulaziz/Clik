const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = `${process.env.JWT_SECRET}`;

async function signup(req, res) {
    try {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.set("Authorization", token);
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function logout(req, res) {
    try {
        // Implement logout functionality here
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { signup, login, logout };
