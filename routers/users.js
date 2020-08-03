const express = require('express');
const router = express.Router();
const User = require('../models/user');
const path = require('path');

router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send("Error " + error)
    }
});


router.post('/create', async (req, res) => {

    console.log(req.body.firstname);
    res.json({ 'status': 'success' });
    const users = new User({
        name: req.body.name,
        sex: req.body.sex,
        email: req.body.email,
        password: req.body.password

    });

    try {
        const user = await users.save();
        res.json(user);
    } catch (error) {
        res.send('Error ' + error);
    }

});

router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.json(users);
    } catch (error) {
        res.send('Error ' + error);
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        users.name = req.headers.name;
        users.email = req.headers.email;
        users.sex = req.headers.sex;
        users.password = req.headers.password;
        const user = await users.save();
        res.json(user);
    } catch (error) {
        res.send('Error ' + error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        var getID = { _id: req.params.id };
        const users = await User.deleteOne(getID);
        res.json(users);
    } catch (error) {
        console.log('Error ' + error);
    }
});
module.exports = router;