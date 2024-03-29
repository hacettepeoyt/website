const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
const {log} = require('../utils');
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

    const newProject = await Project.create(project);
    log(`Posted new project with ID: "${newProject.id}"`);
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
        log(`Project with ID: "${req.params.id}" not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Updated project with ID: "${req.params.id}"`);
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
        log(`Project with ID: "${req.params.id}" not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Deleted project with ID: "${req.params.id}"`);
    return res.status(200).send();
});

module.exports = router;
