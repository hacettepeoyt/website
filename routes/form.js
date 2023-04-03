const express = require('express');
const router = express.Router();
const {validateFields} = require('../middleware');
const Member = require('../models/member');
const utils = require('../utils');
const {logger} = require("../utils");

const boilerplate = 'layouts/boilerplate';


router.get('/enroll', async (req, res) => {
    return res.render(boilerplate, {page: '../sections/forms/enroll'});
});

router.post('/enroll', validateFields, async (req, res) => {
    const newMember = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentID: req.body.studentID,
        degree: req.body.degree,
        email: req.body.email,
        department: req.body.department,
        mobileNumber: req.body.mobileNumber,
        groupChat: req.body.groupChat,
    };

    const oldMember = await Member.findOne({studentID: req.body.studentID});

    if (oldMember) {
        await Member.findOneAndUpdate({studentID: req.body.studentID}, newMember, {runValidators: true, new: true});
        logger(`Updated member with ID ${req.body.studentID}\n${JSON.stringify(newMember, null, 4)}`);
        return res.render(boilerplate, {page: '../success'});
    }

    await Member.create(newMember);
    logger(`Enrolled member with ID ${req.body.studentID}\n${JSON.stringify(newMember, null, 4)}`);
    return res.redirect('/welcome');
});

router.get('/contact', async (req, res) => {
    return res.render(boilerplate, {page: '../sections/forms/contact'});
});

router.post('/contact', async (req, res) => {
    const sum = parseInt(req.body.num1) + parseInt(req.body.num2);
    const isHuman = parseInt(req.body.captcha) === sum;

    if (!isHuman) {
        logger('Failed captcha');
        return res.status(403).send();
    }

    const message = `Someone used the contact form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.message}`;

    await utils.sendMessageToAdminRoom(message);
    logger(`Sending contact message to Admin Room\n${message}`);
    return res.render(boilerplate, {page: '../success'});
});

router.get('/idea', async (req, res) => {
    return res.render(boilerplate, {page: '../sections/forms/idea'});
});

router.post('/idea', async (req, res) => {
    const message = `Someone used the idea form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.projectName}

${req.body.projectDesc}`;

    await utils.sendMessageToAdminRoom(message);
    logger(`Sending idea message to Admin Room\n${message}`);
    res.render(boilerplate, {page: '../success'});
});

module.exports = router;
