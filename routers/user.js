const express = require('express');
const router = express.Router();
const users = require('../models/users');
const upload = require('../config/fileupload');
const { array } = require('../config/fileupload');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .required(),
    lastName: Joi.string()
        .min(2)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required(),
    confirmPassword: Joi.string()
        .min(8)
        .required(),
    role: Joi.string()
        .required(),
    phoneNumber: Joi.string()
        .min(10)
        .max(14)
        .required(),
    gender: Joi.string()
        .required(),
    dateOfBirth: Joi.string()
        .required(),
    address1: Joi.string()
        .max(255)
        .required(),
    address2: Joi.string()
        .max(255)
        .required(),
    city: Joi.string()
        .max(50)
        .required(),
    state: Joi.string()
        .max(50)
        .required(),
});

router.get('/', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        res.send('Something went wrong' + error);
    }
});

router.get('/:id', async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const user = await users.findById(id);
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});
router.post('/create', upload.single('file'), async (req, res) => {
    // Let validate data before we make users
    const validation = schema.validate(req.body);

    const userData = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        file: (req.file) ? req.file.path : null
    });
    res.send(validation);
    //console.log(userData)
    try {
        const user = await userData.save();
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.put('/update/:id', upload.single('file'), async (req, res) => {
    const id = { _id: req.params.id }
    const readUser = await users.findById(id);
    readUser.firstName = req.body.firstName;
    readUser.lastName = req.body.lastName;
    readUser.email = req.body.email;
    readUser.role = req.body.role;
    readUser.phoneNumber = req.body.phoneNumber;
    readUser.gender = req.body.gender;
    readUser.dateOfBirth = req.body.dateOfBirth;
    readUser.address1 = req.body.address1;
    readUser.address2 = req.body.address2;
    readUser.city = req.body.city;
    readUser.state = req.body.state;
    readUser.zipcode = req.body.zipcode;
    if (req.body.password != readUser.password && req.body.confirmPassword != readUser.confirmPassword) {
        readUser.password = req.body.password;
        readUser.confirmPassword = req.body.confirmPassword;
    }
    if (req.file) readUser.file = req.file.path;
    try {
        const getRes = await readUser.save();
        res.json(getRes);
        console.log(getRes)
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

router.delete('/delete/:id', async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const user = await users.deleteOne(id);
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

module.exports = router;