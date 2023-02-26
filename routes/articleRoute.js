const express = require("express");
const router = express.Router();
const Article = require("../model/Article");

router.get("/new", (req, res) => {
    res.render("article/article");
});

router.post("/new", async (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
    });
    try {
        await newArticle.save();
        res.redirect("/");
    } catch (error) {
        res.render("article/article", {
            error: error.message,
        });
    }
});

router.get("/:id/view", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render("article/view", { article: article });
    } catch {
        res.redirect("/");
    }
});

router.get("/:id/edit", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render("article/edit", { article: article });
    } catch {
        res.redirect("/");
    }
});

router.patch("/:id/edit", async (req, res) => {
    let article;
    try {
        article = await Article.findById(req.params.id);
        article.title = req.body.title;
        article.content = req.body.content;
        await article.save();
        res.redirect(`/article/${article.id}/view`);
    } catch (error) {
        res.render("article/edit", {
            article: article,
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    let article;
    try {
        article = await Article.findById(req.params.id);
        await article.remove();
        res.redirect("/");
    } catch {
        if (article == null) {
            res.redirect("/");
        }
    }
});

module.exports = router;
