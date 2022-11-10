// import Router
const { Router } = require("express");
// create userRouter
const userRouter = Router();
// import User and Show models
const { User } = require("../models");
const { Show } = require("../models");

// GET all users from /users
userRouter.get("/", async (req, res) => {
	const allUsers = await User.findAll();
	res.status(200).send(allUsers);
});

// GET one user from /users/:userId
userRouter.get("/:userId", async (req, res) => {
	if (!req.params.userId) {
		return res.sendStatus(400);
	}
	const user = await User.findOne({ where: { id: req.params.userId } });
	if (!user) {
		return res.sendStatus(404);
	}
	res.status(200).send(user);
});

// GET all shows watched by a user (user id in req.params) from /users/:userId/shows
userRouter.get("/:userId/shows", async (req, res) => {
	if (!req.params.userId) {
		return res.sendStatus(400);
	}
	const user = await User.findOne({
		where: { id: req.params.userId },
		include: [Show],
	});
	if (!user) {
		return res.sendStatus(404);
	}
	//const shows = user.Shows;
	res.status(200).send(user.shows);
});

// PUT update and add a show if a user has watched it from /users/:userId/shows/:showId
userRouter.put("/:userId/shows/:showId", async (req, res) => {
	if (!req.params.userId || !req.params.showId) {
		return res.sendStatus(400);
	}
	const user = await User.findOne({ where: { id: req.params.userId } });
	const show = await Show.findOne({ where: { id: req.params.showId } });
	if (!user || !show) {
		return res.sendStatus(404);
	}
	await user.addShow(show);
	res.sendStatus(201);
});

module.exports = userRouter;
