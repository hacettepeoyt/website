const express = require('express');
const router = express.Router();
const {authenticate} = require("../middleware");
const {log} = require("../utils");
const Course = require("../models/course");
const Event = require('../models/event');

const boilerplate = 'layouts/boilerplate';


router.get('/', async (req, res) => {
    const events = await Event.find({}).sort({_id: -1});
    const courses = await Course.find({}).sort({_id: -1});
    return res.render(boilerplate, {page: '../sections/events', events, courses});
});

router.post('/', authenticate, async (req, res) => {
    const event = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration
    };

    const newEvent = await Event.create(event);
    log(`Posted new event with ID: "${newEvent.id}"`);
    return res.status(200).send();
});

router.patch('/:id', authenticate, async (req, res) => {
    const updates = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updates, {runValidators: true, new: true});

    if (!event) {
        log(`Event with ID: "${req.params.id}" not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Updated event with ID: "${req.params.id}"`);
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
        log(`Event with ID: "${req.params.id}" not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Deleted event with ID: "${req.params.id}"`);
    return res.status(200).send();
});

module.exports = router;
