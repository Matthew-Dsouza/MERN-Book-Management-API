const mongoose = require("mongoose");

// creating book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPages: Number,
    categories: [String],
    publication: Number,
});

// creating book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
