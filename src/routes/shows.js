// import Router
const { Router } = require("express");
// create showRouter
const showRouter = Router();
// import Show and User models
const { Show, User } = require("../models");
// import middleware
const { checkStatus, checkRating } = require("../middleware");

// GET all shows from /shows
showRouter.get("/", async (req, res) => {
	const allShows = await Show.findAll({
		attributes: ["title", "genre", "rating", "status"],
	});
	res.status(200).send(allShows);
});

// GET one show from /shows/:showId
showRouter.get("/:showId", async (req, res) => {
	if (!req.params.showId) {
		return res.sendStatus(400);
	}
	const show = await Show.findOne({
		attributes: ["title", "genre", "rating", "status"],
		where: { id: req.params.showId },
	});
	if (!show) {
		return res.sendStatus(404);
	}
	res.status(200).send(show);
});

// GET shows of a particular genre (genre in req.params) from /shows/genres/:genre
showRouter.get("/genres/:genre", async (req, res) => {
	if (!req.params.genre) {
		return res.sendStatus(400);
	}
	const genre = await Show.findAll({
		attributes: ["title", "genre", "rating", "status"],
		where: { genre: req.params.genre },
	});
	if (!genre) {
		return res.sendStatus(404);
	}
	res.status(200).send(genre);
});

// PUT update rating of a show that has been watched from /shows/:showId/rate
showRouter.put("/:showId/rate", checkRating, async (req, res) => {
	if (!req.params.showId || !req.body.rating) {
		return res.sendStatus(400);
	}
	const show = await Show.findOne({
		attributes: ["id", "title", "rating"],
		where: { id: req.params.showId },
	});
	if (!show) {
		return res.sendStatus(404);
	}
	await show.update({
		rating: req.body.rating,
	});
	res.status(201).send(show);
});

// PUT update the status of a show from /shows/:showId/update
showRouter.put("/:showId/update", checkStatus, async (req, res) => {
	if (!req.params.showId || !req.body.status) {
		return res.sendStatus(400);
	}
	const show = await Show.findOne({
		attributes: ["id", "title", "status"],
		where: { id: req.params.showId },
	});
	if (!show) {
		return res.sendStatus(404);
	}
	await show.update({
		status: req.body.status,
	});
	res.status(201).send(show);
});

// DELETE a show from /shows/:showId/delete
showRouter.delete("/:showId/delete", async (req, res) => {
	if (!req.params.showId) {
		return res.sendStatus(400);
	}
	const show = await Show.findOne({ where: { id: req.params.showId } });
	if (!show) {
		return res.sendStatus(404);
	}
	await show.destroy();
	res.status(201).send(`${show.title} deleted!`);
});
module.exports = showRouter;
