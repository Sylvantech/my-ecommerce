const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");

router.get("/getById", async (req, res) => {
    const id = req.query.id;
    try {
        const review = await Review.findOne({ id: id });
        if (!review || review.length === 0) {
            return res.status(404).json({
                error: "Il n'y a pas de review",
            });
        }
        return res.status(200).json({
            review: review,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erreur lors de la récupération des reviews",
            details: error.message,
        });
    }
});