const express = require('express');
const router = express.Router();
const {authenticate} = require("../middleware");
const {log} = require("../utils");
const Faq = require('../models/faq');

const boilerplate = 'layouts/boilerplate';


router.get('/', async (req, res) => {
    const faqs = await Faq.find({});
    return res.render(boilerplate, {page: '../sections/faq', faqs});
});

router.post('/', authenticate, async (req, res) => {
    const faq = {
        question: req.body.question,
        answer: req.body.answer
    };

    await Faq.create(faq);
    log(`Posted new QA\n${JSON.stringify(faq, null, 4)}`);
    res.status(200).send();
});

router.patch('/:id', authenticate, async (req, res) => {
    const updates = {
        question: req.body.question,
        answer: req.body.answer
    }

    const faq = await Faq.findByIdAndUpdate(req.params.id, updates, {runValidators: true, new: true});

    if (!faq) {
        log(`QA with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Updated QA with ID ${req.params.id}\n${JSON.stringify(updates, null, 4)}`);
    return res.status(200).send();
});

router.delete('/:id', authenticate, async (req, res) => {
    const faq = await Faq.findByIdAndDelete(req.params.id);

    if (!faq) {
        log(`QA with ID ${req.params.id} not found`, 'ERROR');
        return res.status(404).send();
    }

    log(`Deleted QA with ID ${req.params.id}`);
    return res.status(200).send();
});

module.exports = router;
