const mongoose = require("mongoose");

// creating author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// creating author model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;
