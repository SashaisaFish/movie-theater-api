// import express
const express = require("express");
// add web server app const
const app = express();
// import routers
const userRouter = require("./routes/users");
const showRouter = require("./routes/shows");
// import middleware
const {checkStatus, checkRating} = require('./middleware')
// import db
const {db} = require("./db/db");
//import seed
const seed = require("./db/seed");
//import express validator
const { body, validationResult } = require("express-validator");

// allow web server to parse JSON
app.use(express.json());
// use routers
app.use("/users", userRouter);
app.use("/shows", showRouter);

// set endpoint for seeding db
app.get("/seed", async (req, res) => {
	await seed();
	res.status(201).send("Shows and User database info populated and reset!");
});

//listen on port
app.listen(5000, async () => {
	console.log("Listening on port 5000");
});
