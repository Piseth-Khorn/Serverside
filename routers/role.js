const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const Joi = require('@hapi/joi');


const schema = Joi.object({
    name: Joi.string().required().max(50)
});


router.get('/', async (req, res) => {
    try {
        const getRes = await Role.find();
        res.json(getRes);
    } catch (error) {
        res.status(400).send('Something went wrong' + error);
    }
});

router.post('/create', async (req, res) => {



    const validation = schema.validate(req.body);
    res.send(validation);
    const role = new Role({
        name: req.body.name
    });
    try {
        const getRes = await role.save();
        res.json(getRes);
        console.log(role);
    } catch (error) {
        res.status(400).send(error);
    }

});


router.put('/update/:id', async (req, res) => {
    const validation = schema.validate(req.body);
    res.send(validation);
    const readRole = await Role.findById({ _id: req.params.id });
    readRole.name = req.body.name;
    try {
        const getRes = await readRole.save();
        res.json(getRes);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const role = await Role.deleteOne({ _id: req.params.id });
        res.json(role);
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;