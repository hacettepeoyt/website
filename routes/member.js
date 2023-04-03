const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
const Member = require('../models/member');
const {generateCsv, logger} = require("../utils");


router.get('/', authenticate, async (req, res) => {
    const members = await Member.find({});
    const csv = generateCsv(members);
    return res.type('text/csv').send(csv);
});

router.delete('/:studentID', authenticate, async (req, res) => {
    const member = await Member.findOneAndDelete({studentID: req.params.studentID});

    if (!member) {
        logger(`Member with ID not found ${req.params.studentID}`, 'ERROR');
        return res.status(401).send();
    }

    logger(`Deleted member with ID ${req.params.studentID}`);
    return res.status(200).send();
});

module.exports = router;
