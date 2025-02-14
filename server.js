 const express = require('express');
 const color = require('colors');
 const cors = require('cors');
 const morgan = require('morgan');
 const dotenv = require('dotenv');
const { connectDb } = require('./config/db');

 const app = express();
 app.get("/", (req,res) => {
    return res.status(200).send("<h1>Welcome to food serve</h1>")
 })

//dotenv cinfigration  
dotenv.config();
// DB connection 

connectDb   ()
//  middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// router  
app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/user",require("./routes/userRoutes"));

// port
 const PORT = process.env.PORT || 8000;

//  listen 
app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`);
});