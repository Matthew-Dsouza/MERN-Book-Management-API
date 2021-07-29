const mongoose = require("mongoose");

// creating publication schema
PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// creating publication model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
