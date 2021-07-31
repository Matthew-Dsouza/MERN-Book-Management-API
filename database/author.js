const mongoose = require("mongoose");

// creating author schema
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        max: 10,
    },
    name: {
        type: String,
        required: true,
        maxLength: 10
    },
    books: [String],
});

// creating author model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;
