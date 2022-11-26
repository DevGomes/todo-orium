const express = require('express');
const bodyParser = require('body-parser'); 
const usersRoute = require('../server/routes/usersRoute');
const listTodoRoute = require('../server/routes/listRoute');
const { slower, limiter } = require('../server/middlewares/rateLimit');
const cors = require('cors')

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(cors());

app.use(limiter);
app.use(slower);

app.use('/api', usersRoute);
app.use('/api', listTodoRoute);

module.exports = app;
