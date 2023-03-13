const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
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
        return res.status(404).send();
    }
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
        return res.status(404).send();
    }
    return res.status(200).send();
});

module.exports = router;
