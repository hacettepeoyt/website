const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
const {logger} = require('../utils');
const Project = require('../models/project');

const boilerplate = 'layouts/boilerplate';


router.get('/', async (req, res) => {
    const projects = await Project.find({}).sort({_id: -1});
    return res.render(boilerplate, {page: '../sections/arge', projects});
});

router.post('/', authenticate, async (req, res) => {
    const project = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        repository: req.body.repository
    };

    await Project.create(project);
    logger(`Posted new project\n${JSON.stringify(project, null, 4)}`);
    return res.status(200).send();
});

router.patch('/:id', authenticate, async (req, res) => {
    const updates = {
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        repository: req.body.repository
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updates, {new: true, runValidators: true});

    if (!project) {
        logger(`Project with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    logger(`Updated project with ID ${req.params.id}\n${JSON.stringify(updates, null, 4)}`);
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
        logger(`Project with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    logger(`Deleted project with ID ${req.params.id}`);
    return res.status(200).send();
});

module.exports = router;
