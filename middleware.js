const { restart } = require("nodemon");
const utils = require("./utils");
const boilerplate = 'layouts/boilerplate';


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

const pageNotFound = (req, res, next) => {
    const error = {
        status: 404,
        title: 'Page Not Found',
        message: 'We think you misspelled an url.'
        }
  
    res.status(404);
  
    // Hata koduna göre uygun hata sayfasını render edin
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
