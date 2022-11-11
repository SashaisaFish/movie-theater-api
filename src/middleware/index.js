// import express
const express = require('express')
// import express-validation
const { body, validationResult } = require("express-validator");

// check status field in req.body
function checkStatus(req, res, next) {
    try {
        // cannot be empty
        if (body('status').isEmpty()) {
            throw new Error("Cannot be empty")
        }
        // cannot contain whitespace
        if (body('status').contains(' ')) {
            throw new Error("Cannot contain whitespace")
        }
        // must be between 5 and 25 char
        if (!body('status').isLength({min: 5, max: 25})) {
            throw new Error("Must be between 5 and 25 characters")
        }
        next()
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// check rating field in req.body
function checkRating(req, res, next) {
    try {
		// cannot be empty
		if (body('rating').isEmpty()) {
			throw new Error("Cannot be empty");
		}
		// cannot contain whitespace
		if ("contains whitespace") {
			throw new Error("Cannot contain whitespace");
		}
		// must be between 1 and 5 char
		if ("between 1 and 5 char") {
			throw new Error("Must be between 5 and 25 characters");
		}
		// must be integer
		if ("integer") {
			throw new Error("Must be an integer");
		}
		next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

module.exports = { checkRating, checkStatus };
