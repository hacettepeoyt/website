const express = require("express");
const controller = require("../controllers/main");
const router = express.Router();

router.get('/', controller.renderHomePage);
router.get('/about', controller.renderAboutPage);
router.get('/faq', controller.renderFaqPage);
router.get('/events', controller.renderEventsPage);
router.get('/arge', controller.renderArgePage);
router.get('/forms/:form', controller.renderFormPage);
router.get('/welcome', controller.renderWelcome);

module.exports = router;
