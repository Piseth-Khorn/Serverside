const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../privateRoute/verifyToken');

router.post('/', async (req, res) => {
    console.log(req.body)
    const findUserEmail = await User.findOne({ email: req.body.email });
    if (!findUserEmail) return res.status(400).send('Email not found');
    const validPass = await bcrypt.compare(req.body.password, findUserEmail.password);
    if (!validPass) return res.status(400).send('Invalid password');
    // Create and assign token
    const token = jwt.sign({ _id: findUserEmail._id }, process.env.TOKEN_SECRET);
    res.header('access-token', token).send(token);
});

router.get('/',verifyToken,async(req,res)=>{
    const id = req.user;
    res.json(req.user);
   // console.log(id._id)
});



module.exports = router;