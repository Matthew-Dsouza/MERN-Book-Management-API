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
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;
