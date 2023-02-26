const express = require("express");
const router = express.Router();
const Article = require("../model/Article");

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find({})
            .sort({ createdAt: "desc" })
            .limit(10)
            .exec();
        res.render("index", { articles: articles });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
