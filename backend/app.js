const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const fileUpload = require('express-fileupload')
const path = require('path')
const dotenv = require('dotenv');
const morgan = require("morgan");
// const logToMongo = require("./middlewares/log-to-mongo");

app.use(morgan("combined"));
// app.use(logToMongo);
app.use(cors({
    httpOnly: true,
    secure: true,
    sameSite: 'none',
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

// const disease = require('./routes/disease');
// const injury = require('./routes/injury');
// const animal = require('./routes/animal');
const user = require('./routes/user');
const donation = require('./routes/donation');
const dashboard = require('./routes/dashboard');
const schedule = require('./routes/schedule');
const health = require('./routes/health');
const applicant = require('./routes/applicant');
const report = require('./routes/report');
const announcement = require('./routes/announcement');
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const activitylogs = require('./routes/activitylogs');
const notification = require('./routes/notification');
const dialysis = require('./routes/dialysis');
// const home = require('./routes/home');
// const dashboard = require('./routes/dashboard');

app.use('/api/', user)
app.use('/api/', donation)
app.use('/api/', dialysis)
app.use('/api/', dashboard)
app.use('/api/', schedule)
app.use('/api/', health)
app.use('/api/', announcement)
app.use('/api/', applicant)
app.use('/api/', report)
app.use('/api/', activitylogs)
app.use('/api/', notification)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
// app.use('/api/', home)
// app.use('/api/', dashboard)

if (process.env.NODE_ENV !== 'PRODUCTION') 
    require('dotenv').config({ path: 'backend/config/config.env' })


    if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


module.exports = app