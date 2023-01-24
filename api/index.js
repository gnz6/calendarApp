const express = require("express");
require("dotenv").config();
const {PORT} = process.env
const app = express();


app.use( express.static("public") );


// Routes

// Auth
app.use("/api/auth", require("./routes/auth"));


// Calendar
app.use("/api/calendar", require("./routes/calendar"));


app.listen( PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})