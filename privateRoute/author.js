const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    console.log(req.body)
    const findUserEmail = await User.findOne({ email: req.body.email });
    if (!findUserEmail) return res.status(400).send('Email not found');
    const validPass = await bcrypt.compare(req.body.password, findUserEmail.password);
    if (!validPass) return res.status(400).send('Invalid password');
    // Create and assign token
    const token = jwt.sign({ _id: findUserEmail._id }, process.env.TOKEN_SECRET);
    res.header('access_token', token).send({ token: token });
});



module.exports = router;