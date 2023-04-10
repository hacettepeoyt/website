const {validateString, log} = require('./utils');

const boilerplate = 'layouts/boilerplate';


const authenticate = (req, res, next) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        next();
    } else {
        log(`Client authentication failed with key: "${req.body.auth}"`);
        return next({status: 401});
    }
};

const validateFields = (req, res, next) => {
    for (const key in req.body) {
        if (key === 'tellus') { // Skip validation for the "tellus" field
            continue;
        }
        if (!validateString(req.body[key])) {
            log(`Client string validation failed, length: "${req.body[key].length}"`);
            return next({status: 400, message: `${key} uzunluğu 64'ten büyük olamaz!`});
        }
    }
    next();
};

const handleErrorResponse = (err, req, res, next) => {
    log(JSON.stringify(err), 'ERROR');
    let error;

    if (err.status === 400) {
        error = {
            status: err.status,
            title: err.title ? err.title : 'Bad Request',
            message: err.message ? err.message : 'Yok öyle bir istek =)'
        };
    } else if (err.status === 401) {
        error = {
            status: err.status,
            title: err.title ? err.title : 'Yetkisiz Kullanıcı',
            message: err.message ? err.message : 'Bu işlem için yetkili olman gerekiyor!'
        };
    } else if (err.status === 404) {
        error = {
            status: err.status,
            title: err.title ? err.title : 'İstediğin Şeyi Bulamadık!',
            message: err.message ? err.message : 'Çünkü öyle bir şey yok ;)'
        };
    } else if (err.status === 418) {
        error = {
            status: err.status,
            title: err.title ? err.title : 'Ben Bir Çaydanlığım',
            message: err.message ? err.message : 'Sana çay yok!'
        };
    } else {
        error = {
            status: 500,
            title: err.title ? err.title : 'Bizim Tarafımızda Bir Hata Oluştu',
            message: err.message ? err.message : 'Bize ulaşırsan sorunu daha hızlı çözebiliriz!'
        };
    }

    return res.render(boilerplate, {page: '../error', error});
}

module.exports = {
    authenticate,
    validateFields,
    handleErrorResponse
};
