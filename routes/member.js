const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware');
const Member = require('../models/member');
const {generateCsv} = require("../utils");

router.get('/', authenticate, async (req, res) => {
    const members = await Member.find({});
    const csv = generateCsv(members);
    return res.type('text/csv').send(csv);
});

router.delete('/:studentID', authenticate, async (req, res) => {
    const member = await Member.findOneAndDelete({ studentID: req.params.studentID });

    if (!member) {
        return res.status(401).send();
    }
    return res.status(200).send();
});

module.exports = router;
