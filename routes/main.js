const express = require("express");
const controller = require("../controllers/main");
const router = express.Router();

router.get('/', controller.renderHomePage);
router.get('/about', controller.renderAboutPage);
router.get('/faq', controller.renderFaqPage);
router.get('/events', controller.renderEventsPage);
router.get('/arge', controller.renderArgePage);
router.get('/welcome', controller.renderWelcome);
router.get('/enroll', controller.renderEnrollForm);
router.get('/contact', controller.renderContactForm);
router.get('/idea', controller.renderIdeaForm);

router.post('/enroll', controller.enroll);
router.post('/contact', controller.contact);
router.post('/idea', controller.shareIdea);


module.exports = router;
