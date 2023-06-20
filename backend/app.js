require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const publicRouter = require('./routes/public');
const electionRouter = require('./routes/elections');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/elections', electionRouter);
app.use('/public', publicRouter)
app.use('/static', express.static('public'))

module.exports = app;