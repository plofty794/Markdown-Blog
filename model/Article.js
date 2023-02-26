const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

articleSchema.pre("save", async function (next) {
    try {
        const existingArticle = await Article.findOne({ title: this.title });
        if (existingArticle) throw new Error("Title already exist");
        next();
    } catch (error) {
        next(error);
    }
});

articleSchema.post("remove", function (next) {
    console.log("Article successfully removed");
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
