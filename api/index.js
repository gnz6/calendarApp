const express = require("express");
const dbConnection = require("./database/config");
require("dotenv").config();
const {PORT} = process.env
const app = express();
const cors = require("cors");

//DB Connection
dbConnection()

app.use(cors());
app.use( express.static("public") );


app.use(express.json());


// Routes

// Auth
app.use("/api/auth", require("./routes/auth"));


// Calendar
app.use("/api/calendar", require("./routes/calendar"));


app.listen( PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})