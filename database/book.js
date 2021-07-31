const mongoose = require("mongoose");

// creating book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
    }, //required validation
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
    }, //required validation
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPages: Number,
    categories: [String],
    publication: {
        type: Number,
        required: true,
        max: 10,
    },
});

// creating book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
