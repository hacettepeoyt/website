const utils = require("./utils");
const {log} = require("./utils");


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

module.exports = {
    authenticate,
    validateFields
};
