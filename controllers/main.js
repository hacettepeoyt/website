const https = require("https");

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

function sendMessageToAdminRoom(message) {
    const body = JSON.stringify({
        msgtype: "m.text",
        body: message
    });

    var post_options = {
        host: 'matrix.org',
        path: `/_matrix/client/r0/rooms/${process.env.MATRIX_ADMIN_ROOM}/send/m.room.message?access_token=${process.env.MATRIX_ACCESS_TOKEN}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    // TODO: Error handling.
    const matrix_req = https.request(post_options);
    matrix_req.write(body);
    matrix_req.end();
}

const enroll = async (req, res) => {
    // TODO: Error handling.
    console.log("POST Enroll");
    const oldMember = await Member.findOne({studentID: req.body.studentID});

    if (!oldMember) {
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
    
        await Member.insertMany(newMember);
    }

    res.redirect('/welcome');
}

const contact = async (req, res) => {
    console.log("POST Contact");
    console.log(req.body);
    const message = `Someone used the contact form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.message}`;
    sendMessageToAdminRoom(message);
}

const shareIdea = async (req, res) => {
    console.log("POST Idea");
    console.log(req.body);
    const message = `Someone used the idea form:
----
Name: ${req.body.firstname}
Surname: ${req.body.lastname}
E-mail: ${req.body.email}
----
${req.body.projectName}

${req.body.projectDesc}`;
    sendMessageToAdminRoom(message);
}

const newEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
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
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const newCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
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
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const newProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
        const project = {
            img: data.img,
            name: data.name,
            description: data.description,
            status: data.status,
            repository: data.repository
        }

        await Project.insertMany(project)
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
        await Event.findOneAndDelete({ name: data.name });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
        await Course.findOneAndDelete({ name: data.name });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const deleteProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
        await Project.findOneAndDelete({ name: data.name });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateEvent = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
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
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateCourse = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
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
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

const updateProject = async (req, res) => {
    data = req.body;

    if (data.auth === process.env.AUTH_KEY) {
        const project = {
            img: data.img,
            name: data.name,
            description: data.description,
            status: data.status,
            repository: data.repository
        }

        await Project.findOneAndUpdate({ name: data.name }, project, { runValidators: true, new: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
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
