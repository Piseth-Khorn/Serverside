const express = require('express');
const router = express.Router();
const users = require('../models/users');
const upload = require('../config/fileupload');
const { array } = require('../config/fileupload');
router.get('/', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        res.send('Something went wrong' + error);
    }
});

router.post('/create', upload.single('file'), async (req, res) => {
    console.log(req.file);
    const userData = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role,
        phoneNumber: req.body.telephone,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.city,
        zipcode: req.body.zip,
        file: (req.file) ? req.file.path : null
    });
    console.log(userData)
    try {
        const user = await userData.save();
        res.send(user);
    } catch (error) {
        res.send('Something went wrong ' + error);
    }

})


module.exports = router;