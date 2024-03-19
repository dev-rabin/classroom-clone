const express = require('express');
const app = express();
const port = 4000;
const db = require('./src/connection');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(port, ()=>{
    console.log(`Server starting at ${port}`);
});
app.use('/api/uploads', express.static('uploads'));


app.get('/user', (req, res)=> {
    db.ping((error)=>{
        if(error){
        return res.send("My server is down");
        } else{
            res.send("Server is connected");
        }
    })
});
const userRouter = require('./src/routes/user_routes');
app.use('/api', userRouter);

const classRouter = require('./src/routes/class_routes');
app.use('/api', classRouter);

const classEnrollment = require('./src/routes/enroll_classRoutes');
app.use('/api', classEnrollment);

const assignmentRouter = require('./src/routes/assignment_routes');
app.use('/api', assignmentRouter);

const submissionRouter = require('./src/routes/submissionRouter');
app.use('/api', submissionRouter);

const announcementRouter = require('./src/routes/announcement_routes');
app.use('/api',announcementRouter)