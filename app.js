// app.js
const express = require('express');
const user = require('./routes/user.route')
const notify = require('./routes/notify.route')
const port = process.env.PORT || 4001;
const {createServer} = require('http')
const index = require("./routes/index");
const bodyParser = require('body-parser')
// initialize our express app

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connecting to the database
app.use(index)
app.use('/api/v1/users', user)
app.use('/api/v1/notify', notify)


httpServer.listen(port);
