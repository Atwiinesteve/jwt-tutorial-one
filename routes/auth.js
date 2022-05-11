// Importing Modules
// ===================================
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');
const { registerValidation, loginValidation } = require('../validate.js');
// ===================================



// ===================================
// Main Router setup.
const router = express.Router();
// ===================================



// ===================================
// Register Route.
router.post('/register', async(req, res) => {

    // Validate Data before sending to database.
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if User Exists Already
    const alreadyExists = await User.findOne({ email: req.body.email });
    if (alreadyExists) return res.status(400).send('User already exists...');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)

    // Creating User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });
    user.save()
        .then(() => { res.status(201).send('User Saved to Database...') })
        .catch(err => { res.status(500).send(err.message) })

});
// ===================================



// ===================================
// Login Route.
router.post('/login', async(req, res) => {

    // Validate Data before sending to database.
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if User Exists Already
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('User email not Found');

    // Compare Passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Unauthorised - Failed to Login');

    // Assign a token to the user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});
// ===================================



// ===================================
// Export Router
module.exports = router;
// ===================================