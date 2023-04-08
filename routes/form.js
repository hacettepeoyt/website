const express = require('express');
const router = express.Router();
const {validateFields} = require('../middleware');
const {log} = require("../utils");
const Member = require('../models/member');
const utils = require('../utils');

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

    const message = `Someone used the enroll form:
----
Name: ${req.body.firstName}
Surname: ${req.body.lastName}
E-mail: ${req.body.email}
----
${req.body.tellus}`;

    const oldMember = await Member.findOne({studentID: req.body.studentID});

    if (oldMember) {
        await Member.findOneAndUpdate({studentID: req.body.studentID}, newMember, {runValidators: true, new: true});
        log(`Updated member with studentID: "${req.body.studentID}"`);
        await utils.sendMessageToAdminRoom(message);
        log(`Sending enroll message to Admin Room, message: "${message}"`);
        return res.render(boilerplate, {page: '../success'});
    }

    await Member.create(newMember);
    log(`Enrolled member with studentID: "${req.body.studentID}"`);

    await utils.sendMessageToAdminRoom(message);
    log(`Sending enroll message to Admin Room, message: "${message}"`);

    return res.redirect('/welcome');
});

router.get('/contact', async (req, res) => {
    return res.render(boilerplate, {page: '../sections/forms/contact'});
});

router.post('/contact', async (req, res) => {
    const sum = parseInt(req.body.num1) + parseInt(req.body.num2);
    const isHuman = parseInt(req.body.captcha) === sum;

    if (!isHuman) {
        log('Failed captcha');
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
    log(`Sending contact message to Admin Room, message: "${message}"`);
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
    log(`Sending idea message to Admin Room, message: "${message}"`);
    res.render(boilerplate, {page: '../success'});
});

module.exports = router;
