const content = require('../models/content');
const Member = require('../models/member');
const Faq = content.Faq;
const Event = content.Event;
const Project = content.Project;
const Course = content.Course;

const boilerplate = "layouts/boilerplate";
const errorPage = "../error";


// TODO new solution for error handling instead of try-catch
// TODO Reorganise the controller


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
    try {
        const page = "../sections/arge";
        const projects = await Project.find({});
        res.render(boilerplate, { page, projects });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderWelcome = async (req, res) => {
    res.render(boilerplate, { page: "../sections/welcome" })
}

const renderEnrollForm = async (req, res) => {
    const page = "../sections/forms/enroll";
    res.render(boilerplate, { page: page });
}

const renderContactForm = async (req, res) => {
    const page = "../sections/forms/contact";
    res.render(boilerplate, { page: page });
}

const renderIdeaForm = async (req, res) => {
    const page = "../sections/forms/request";
    res.render(boilerplate, { page: page });
}

const renderWIP = async (req, res) => {
    res.render(boilerplate, { page: "../sections/wip" })
}

const enroll = async (req, res) => {
    console.log("POST Enroll");
    
    const newMember = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentID: req.body.studentID,
        degree: req.body.degree,
        email: req.body.email,
        department: req.body.department,
        mobileNumber: req.body.mobileNumber,
        groupChats: 3                           // TODO @div72
    }

    Member.insertMany(newMember);
}

const contact = async (req, res) => {
    console.log("POST Contact");
    console.log(req.body);
}

const shareIdea = async (req, res) => {
    console.log("POST Idea");
    console.log(req.body);
}

const newEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const event = {
            img: data.img,
            name: data.name,
            description: data.description,
            location: data.location,
            time: data.time,
            date: data.date,
            duration: data.duration
        }

        await Event.insertMany(event)
        res.status(200).send();
    } else {
        res.status(401).send();
    }
}

const newCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const course = {
            img: data.img,
            name: data.name,
            description: data.description,
            preRequisite: data.preRequisite,
            location: data.location,
            time: data.time,
            date: data.date,
            duration: data.duration
        }

        await Course.insertMany(course)
        res.status(200).send();
    } else {
        res.status(401).send();
    }
}

const newProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const project = {
            img: data.img,
            name: data.name,
            description: data.description,
            status: data.status,
            repository: data.repository
        }

        await Project.insertMany(project)
        res.status(200).send();
    } else {
        res.status(401).send();
    }
}

const deleteEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        await Event.findOneAndDelete({ name: data.name });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}

const deleteCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        await Course.findOneAndDelete({ name: data.name });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}

const deleteProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        await Project.findOneAndDelete({ name: data.name });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}

const updateEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const event = {
            img: data.img,
            name: data.name,
            description: data.description,
            location: data.location,
            time: data.time,
            date: data.date,
            duration: data.duration
        }

        await Event.findOneAndUpdate({ name: data.name }, event, { runValidators: true, new: true });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}

const updateCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const course = {
            img: data.img,
            name: data.name,
            description: data.description,
            preRequisite: data.preRequisite,
            location: data.location,
            time: data.time,
            date: data.date,
            duration: data.duration
        }

        await Course.findOneAndUpdate({ name: data.name }, course, { runValidators: true, new: true });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}

const updateProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.POST_AUTH) {
        const project = {
            img: data.img,
            name: data.name,
            description: data.description,
            status: data.status,
            repository: data.repository
        }

        await Project.findOneAndUpdate({ name: data.name }, project, { runValidators: true, new: true });
        res.status(200).send()
    } else {
        res.status(401).send()
    }
}



module.exports = {
    renderHomePage,
    renderAboutPage,
    renderFaqPage,
    renderEventsPage,
    renderArgePage,
    renderWelcome,
    renderEnrollForm,
    renderContactForm,
    renderIdeaForm,
    enroll,
    contact,
    shareIdea,
    newEvent,
    newCourse,
    newProject,
    deleteEvent,
    deleteCourse,
    deleteProject,
    updateEvent,
    updateCourse,
    updateProject
}
