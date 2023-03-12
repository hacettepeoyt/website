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
router.get('/members', controller.getMembers);
router.get('*', controller.pageNotFound)

router.post('/enroll', controller.enroll);
router.post('/contact', controller.contact);
router.post('/idea', controller.shareIdea);
router.post('/event', controller.newEvent);
router.post('/course', controller.newCourse);
router.post('/arge', controller.newProject);
router.post('/faq', controller.newFaq);

router.delete('/event', controller.deleteEvent);
router.delete('/course', controller.deleteCourse);
router.delete('/arge', controller.deleteProject);
router.delete('/faq', controller.deleteFaq);
router.delete('/members', controller.deleteMember);

router.patch('/event', controller.updateEvent);
router.patch('/course', controller.updateCourse);
router.patch('/arge', controller.updateProject);
router.patch('/faq', controller.updateFaq);


module.exports = router;
