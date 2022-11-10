// import Router
const {Router} = require('express')
// create showRouter
const showRouter = Router();
// import Show and User models
const Show = require('../models')
const User = require("../models");


// GET all shows from /shows
showRouter.get("/shows", async (req, res) => {
	const allShows = await Show.findAll();
	res.status(200).send(allShows);
});

// GET one show from /shows/:showId
showRouter.get("/shows/:showId", async (req, res) => {
	if (!req.params.showId) {
		return res.sendStatus(400);
	}
	const show = await Show.findOne({ where: { showId: req.params.showId } });
	if (!show) {
		return res.sendStatus(404);
	}
	res.status(200).send(show);
});

// GET shows of a particular genre (genre in req.params) from /shows/genres/:genre


// PUT update rating of a show that has been watched from /shows/:showId/rate


// PUT update the status of a show from /shows/:showId/update


// DELETE a show from /shows/:showId/delete


module.exports = showRouter