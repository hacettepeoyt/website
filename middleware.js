const utils = require("./utils");


const authenticate = (req, res, next) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        next();
    } else {
        return res.status(401).send();
    }
};

const validateFields = (req, res, next) => {
    for (const key in req.body) {
        if (!utils.validateString(req.body[key])) {
            return res.status(400).send();
        }
    }
    next();
};

module.exports = {
    authenticate,
    validateFields
};
