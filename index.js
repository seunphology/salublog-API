const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
//App Config
const app = express()
const port = process.env.PORT || 4000
const multer = require("multer");
const authRoute= require("./routes/auth");
const userRoute= require("./routes/users");
const postRoute= require("./routes/posts");
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(console.log("Connected to MongoDB"))
.catch((err)=> console.log(err))

const storage = multer.diskStorage({

    destination:(req,file,cb)=> {
        cb(null, "images")
    }, 
    filename:(req,file,cb)=>{
        cb(null, "hello.jpeg");

    },
    });

    const upload = multer({storage:storage});
    app.post("/api/upload", upload.single("file"), (req,res)=> {

    res.status(200).json("file has been uploaded");
    });
//Middleware
//DB Config
//API Endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))

