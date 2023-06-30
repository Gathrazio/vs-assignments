const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter')

// middleware: what should happen for every request to the server
app.use(express.json()) // looks for a request body, parses the JSON into js, and places it into req.body 

// routes

app.use("/users", userRouter)


app.listen(9000, () => console.log("This server is running on port 9000!"))