const boilerplate = "layouts/boilerplate";
const errorPage = "../error";

// Page contents are hardcoded right now, will be fixed later!

const renderHomePage = async (req, res) => {
    res.redirect("/about");
}

const renderAboutPage = async (req, res) => {
    try {
        const page = "../sections/about";
        fooText = "Hakkımızda";
        res.render(boilerplate, { page });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderFaqPage = async (req, res) => {
    try {
        const page = "../sections/faq";
        res.render(boilerplate, { page });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderEventsPage = async (req, res) => {
    try {
        const page = "../sections/events";
        res.render(boilerplate, { page });
    } catch (err) {
        res.render(boilerplate, { page: errorPage, err });
    }
}

const renderArgePage = async (req, res) => {
    try {
        const page = "../sections/arge";
        res.render(boilerplate, { page });
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

module.exports = {
    renderHomePage,
    renderAboutPage,
    renderFaqPage,
    renderEventsPage,
    renderArgePage,
    renderFormPage
}
