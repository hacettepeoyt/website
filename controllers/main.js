const content = require('../models/content');
const Member = require('../models/member');
const Faq = content.Faq;
const Event = content.Event;
const Project = content.Project;
const Course = content.Course;

const boilerplate = "layouts/boilerplate";
const errorPage = "../error";


const renderHomePage = async (req, res) => {
    res.redirect("/about");
}

const renderAboutPage = async (req, res) => {
    try {
        const page = "../sections/about";
        res.render(boilerplate, { page });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderFaqPage = async (req, res) => {
    try {
        const page = "../sections/faq";
        const faqs = await Faq.find({});
        res.render(boilerplate, { page, faqs });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderEventsPage = async (req, res) => {
    await renderWIP(req, res);
    return;
    try {
        const page = "../sections/events";
        const events = await Event.find({});
        const courses = await Course.find({});
        res.render(boilerplate, { page, events, courses });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderArgePage = async (req, res) => {
    await renderWIP(req, res);
    return;
    try {
        const page = "../sections/arge";
        const projects = await Project.find({});
        res.render(boilerplate, { page, projects });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderFormPage = async (req, res) => {
    const { form } = req.params;
    const enrollPage = "../sections/forms/enroll";
    const contactPage = "../sections/forms/contact";
    const requestPage = "../sections/forms/request";

    try {
        if (form === 'contact') {
            res.render(boilerplate, { page: contactPage });
        } else if (form === 'enroll') {
            res.render(boilerplate, { page: enrollPage });
        } else if (form == 'request') {
            res.render(boilerplate, { page: requestPage });
        } else {
            throw Error;
        }
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderWIP = async (req, res) => {
    res.render(boilerplate, { page: "../sections/wip" })
}

const renderWelcome = async (req, res) => {
    res.render(boilerplate, { page: "../sections/welcome" })
}

module.exports = {
    renderHomePage,
    renderAboutPage,
    renderFaqPage,
    renderEventsPage,
    renderArgePage,
    renderFormPage,
    renderWelcome
}
