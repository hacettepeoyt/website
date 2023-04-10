const utils = require("./utils");
const {log} = require("./utils");

const boilerplate = 'layouts/boilerplate';


const authenticate = (req, res, next) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        next();
    } else {
        log(`Client authentication failed with key: "${req.body.auth}"`);
        return res.status(401).send();
    }
};

const validateFields = (req, res, next) => {
    for (const key in req.body) {
        if (key === 'tellus') { // Skip validation for the "tellus" field
            continue;
        }
        if (!utils.validateString(req.body[key])) {
            log(`Client string validation failed, length: "${req.body[key].length}"`);
            return res.status(400).send();
        }
    }
    next();
};

const pageNotFound = (req, res, next) => {
    const error = {
        status: 404,
        title: 'Page Not Found',
        message: 'We think you misspelled an url.'
    }

    res.status(404);

    // Render error pages by looking at error status code
    if (error.status === 404) {
        res.render(boilerplate, {page: '../error', error: error});
    } else {
        next();
    }
};

module.exports = {
    authenticate,
    validateFields,
    pageNotFound
};
