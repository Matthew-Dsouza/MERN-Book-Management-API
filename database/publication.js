const mongoose = require("mongoose");

// creating publication schema
PublicationSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        max: 10,
    },
    name: {
        type: String,
        required: true,
        maxLength: 15,
    },
    books: [String],
});

// creating publication model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
