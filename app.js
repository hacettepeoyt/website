require('dotenv').config();
const express = require('express');
const expressAsyncErrors = require('./express-async-errors');
const mongoose = require('mongoose');
const path = require('path');
const {log} = require('./utils');

const mainRoute = require('./routes/main');
const argeRoute = require('./routes/arge');
const courseRoute = require('./routes/course');
const eventRoute = require('./routes/event');
const faqRoute = require('./routes/faq');
const formRoute = require('./routes/form');
const memberRoute = require('./routes/member');
const {pageNotFound} = require('./middleware');

const DB_URL = process.env.DB_URL;
const PORT = process.env.NODE_LOCAL_PORT;


const app = express();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', mainRoute);
app.use('/', formRoute);
app.use('/arge', argeRoute);
app.use('/courses', courseRoute);
app.use('/events', eventRoute);
app.use('/faq', faqRoute);
app.use('/members', memberRoute);

// Error Middleware
app.use('*', pageNotFound);

// View Engine
app.set('view engine', 'ejs');

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
    log(`Connected to database at DB_URL: "${DB_URL}"`);
});

db.on('error', (error) => {
    log(`Database connection failed, error: "${error}"`, 'ERROR');
});

app.listen(PORT, () => {
    log(`Server is listening on PORT: "${PORT}"`);
});

module.exports = app;
