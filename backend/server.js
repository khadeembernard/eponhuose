const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const UserRouter =require("./routers/user")
const ImagesRouter =require("./routers/images")
const ProgramsRouter =require("./routers/programs")
const EventRouter =require("./routers/event")

app.use(cors());
app.options('*', cors());

app.use(express.text({ limit: '26mb' }));

app.post('/token', async (req, res) => {
    const userToken = req.get('token');
    if (userToken == undefined) {
        return res.status(202).send({ success: false, msg: 'invalid' });
    }
    var updatedToken = await updateToken(userToken);
    res.status(200).send({ success: true, token: updatedToken });
});

app.use('/', async (req, res, next) => {
    next();
});

app.use('/users', UserRouter);

app.use('/event',EventRouter);

app.use("/programs",ProgramsRouter);

app.get("/manager",(req,res)=>{
  res.status(202).sendFile(__dirname+"/appmanager/index.html")
})

app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});

