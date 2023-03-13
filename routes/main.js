const express = require('express');
const router = express.Router();

const boilerplate = 'layouts/boilerplate';


router.get('/', async (req, res) => {
    return res.redirect('/about');
});

router.get('/about', async (req, res) => {
    return res.render(boilerplate, {page: '../sections/about'});
});

router.get('/welcome', async (req, res) => {
    return res.render(boilerplate, {page: '../welcome'})
});

module.exports = router;
