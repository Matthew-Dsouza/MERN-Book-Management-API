require("dotenv").config();

// import express framework
const express = require("express");

// import mongoose
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// initialize express
const Bookman = express();

// configurations
Bookman.use(express.json());

// Establish Database Connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("Connection Established!"));

// Initializing Microservices
Bookman.use("/books", Books);
Bookman.use("/authors", Authors);
Bookman.use("/publications", Publications);

// .

// .

// .

Bookman.listen(4000, () => console.log("Server is running (●'w'●)"));
