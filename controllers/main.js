const content = require('../models/content');
const Member = require('../models/member');
const utils = require('../utils');

const Faq = content.Faq;
const Event = content.Event;
const Project = content.Project;
const Course = content.Course;

const boilerplate = "layouts/boilerplate";
const errorPage = "../error";


// TODO: Reorganise the controller


const renderHomePage = async (req, res) => {
    res.redirect("/about");
}

const renderAboutPage = async (req, res) => {
    res.render(boilerplate, { page: "../sections/about" });
}

const renderFaqPage = async (req, res) => {
    const faqs = await Faq.find({});
    res.render(boilerplate, { page: "../sections/faq", faqs });
}

const renderEventsPage = async (req, res) => {
    const events = await Event.find({});
    const courses = await Course.find({});
    events.reverse();
    courses.reverse();
    res.render(boilerplate, { page: "../sections/events", events, courses });
}

const renderArgePage = async (req, res) => {
    const projects = await Project.find({});
    projects.reverse();
    res.render(boilerplate, { page: "../sections/arge", projects });
}

const renderWelcome = async (req, res) => {
    res.render(boilerplate, { page: "../welcome" })
}

const renderEnrollForm = async (req, res) => {
    res.render(boilerplate, { page: "../sections/forms/enroll" });
}

const renderContactForm = async (req, res) => {
    res.render(boilerplate, { page: "../sections/forms/contact" });
}

const renderIdeaForm = async (req, res) => {
    res.render(boilerplate, { page: "../sections/forms/idea" });
}

const enroll = async (req, res) => {
    const oldMember = await Member.findOne({ studentID: req.body.studentID });

    for (key in req.body) {
        if (!utils.validateString(req.body[key])) {
            res.sendStatus(400);
        }
    }

    const newMember = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentID: req.body.studentID,
        degree: req.body.degree,
        email: req.body.email,
        department: req.body.department,
        mobileNumber: req.body.mobileNumber,
        groupChat: req.body.groupChat
    }

    if (!oldMember) {
        await Member.insertMany(newMember);
        res.redirect('/welcome');
    } else {
        await Member.findOneAndUpdate({ studentID: req.body.studentID }, newMember, { runValidators: true, new: true })
        res.render(boilerplate, { page: "../success" });
    }
}

const contact = async (req, res) => {
    const sum = parseInt(req.body.num1) + parseInt(req.body.num2);

    if (parseInt(req.body.captcha) === sum) {
        const message = `Someone used the contact form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.message}`;
        await utils.sendMessageToAdminRoom(message);
        res.render(boilerplate, { page: "../success" });
    } else {
        res.send("You are a robot!")
    }
}

const shareIdea = async (req, res) => {
    const message = `Someone used the idea form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.projectName}

${req.body.projectDesc}`;
    await utils.sendMessageToAdminRoom(message);
    res.render(boilerplate, { page: "../success" });
}

const newEvent = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const event = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            time: req.body.time,
            date: req.body.date,
            duration: req.body.duration
        }

        await Event.insertMany(event)
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const newCourse = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const course = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            preRequisite: req.body.preRequisite,
            location: req.body.location,
            time: req.body.time,
            date: req.body.date,
            duration: req.body.duration
        }

        await Course.insertMany(course)
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const newProject = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const project = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            repository: req.body.repository
        }

        await Project.insertMany(project)
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const newFaq = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const faq = {
            question: req.body.question,
            answer: req.body.answer
        }

        await Faq.insertMany(faq);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteEvent = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        await Event.findByIdAndDelete(req.body.id);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteCourse = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        await Course.findByIdAndDelete(req.body.id);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteProject = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        await Project.findByIdAndDelete(req.body.id);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteFaq = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        await Faq.findByIdAndDelete(req.body.id);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteMember = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        await Member.findOneAndDelete({ studentID: req.body.studentID });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateEvent = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const event = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            time: req.body.time,
            date: req.body.date,
            duration: req.body.duration
        }

        await Event.findByIdAndUpdate(req.body.id, event, { runValidators: true, new: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateCourse = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const course = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            preRequisite: req.body.preRequisite,
            location: req.body.location,
            time: req.body.time,
            date: req.body.date,
            duration: req.body.duration
        }

        await Course.findByIdAndUpdate(req.body.id, course, { runValidators: true, new: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateProject = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const project = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            repository: req.body.repository
        }

        await Project.findByIdAndUpdate(req.body.id, project, { runValidators: true, new: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateFaq = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const faq = {
            question: req.body.question,
            answer: req.body.answer
        }

        await Faq.findByIdAndUpdate(req.body.id, faq, { runValidators: true, new: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const getMembers = async (req, res) => {
    if (req.body.auth === process.env.AUTH_KEY) {
        const members = await Member.find({});
        let csv = "";

        for (const member of members) {
            csv += `${member.firstName},${member.lastName},${member.studentID},${member.degree},${member.email},${member.department},${member.mobileNumber},${member.groupChat}`;
            csv += "\r\n";
        }

        res.send(csv);
    } else {
        res.sendStatus(401);
    }
}

const pageNotFound = async (req, res) => {
    res.render(boilerplate, { page: "../404" })
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
    newFaq,
    deleteEvent,
    deleteCourse,
    deleteProject,
    deleteFaq,
    deleteMember,
    updateEvent,
    updateCourse,
    updateProject,
    updateFaq,
    getMembers,
    pageNotFound
}
