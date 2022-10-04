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
router.post('/event', controller.newEvent);
router.post('/course', controller.newCourse);
router.post('/arge', controller.newProject);

router.delete('/event', controller.deleteEvent);
router.delete('/course', controller.deleteCourse);
router.delete('/arge', controller.deleteProject);

router.patch('/event', controller.updateEvent);
router.patch('/course', controller.updateCourse);
router.patch('/arge', controller.updateProject);


module.exports = router;
