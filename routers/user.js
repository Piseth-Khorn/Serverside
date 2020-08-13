const express = require('express');
const router = express.Router();
const users = require('../models/users');
const upload = require('../config/fileupload');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const verifyToken = require('../privateRoute/verifyToken');
const saltRounds = 10;
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
    phoneNumber: Joi.number()
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
    zipcode: Joi.number().max(12)
});

router.get('/',verifyToken, async (req, res) => {
    console.log(req.user)
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        res.send('Something went wrong' + error);
    }
});

router.get('/:id',verifyToken, async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const user = await users.findById(id);
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});
router.post('/create',verifyToken, upload.single('file'), async (req, res) => {
    // Let validate data before we make users
    const { error } = schema.validate(req.body);
    const emailExist = await users.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    //HashedPassword
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userData = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
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
    if (error) return res.status(400).send(error.details[0].message);
    //console.log(userData)
    try {
        const user = await userData.save();
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.put('/update/:id',verifyToken, upload.single('file'), async (req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
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
    if (req.body.password==null && req.body.confirmPassword==null) {
        readUser.password =readUser.password;
        readUser.confirmPassword = readUser.confirmPassword;
    }else{
        readUser.password =hashedPassword;
        readUser.confirmPassword = hashedPassword;
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

router.delete('/delete/:id',verifyToken, async (req, res) => {
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