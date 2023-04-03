const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
const Course = require('../models/course');
const {logger} = require("../utils");


router.get('/', async (req, res) => {
    return res.redirect('/events');
});

router.post('/', authenticate, async (req, res) => {
    const course = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        preRequisite: req.body.preRequisite,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration,
    };

    await Course.create(course);
    logger(`Posted new course\n${JSON.stringify(course, null, 4)}`);
    return res.status(200).send();
});

router.patch('/:id', authenticate, async (req, res) => {
    const updates = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        preRequisite: req.body.preRequisite,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration,
    };

    const course = await Course.findByIdAndUpdate(req.params.id, updates, {runValidators: true, new: true});

    if (!course) {
        logger(`Course with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    logger(`Updated course with ID ${req.params.id}\n${JSON.stringify(updates, null, 4)}`);
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        logger(`Course with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    logger(`Deleted course with ID ${req.params.id}`);
    return res.status(200).send();
});

module.exports = router;
