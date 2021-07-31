// Prefix  : /authors

const Router = require("express").Router();

// Database Model
const BookModel = require("../../database/book");
const AuthorModel = require("../../database/author");
const PublicationModel = require("../../database/publication");

/*
Route           /authors
Description     to get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
// MongoDB Optimized
Router.get("/", async (_request, response) => {
    const getAllAuthors = await AuthorModel.find();

    // return response.json({ authors: database.authors });
    return response.json({ authors: getAllAuthors });
});

/*
Route           /authors/id
Description     to get specific author based on author id
Access          PUBLIC
Parameters      author-id
Method          GET
*/
// MongoDB Optimized
Router.get("/id/:authorID", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificAuthor = database.authors.filter(
    //     // you can either convert param to int or author.id to string it works either way
    //     (author) => author.id === parseInt(request.params.authorID)
    //     // (author) => String(author.id) === request.params.authorID
    // );

    const getSpecificAuthor = await AuthorModel.findOne({
        id: parseInt(request.params.authorID),
    });

    // error handling if author is not found
    // if (getSpecificAuthor.length === 0) {
    //     return response.json({
    //         error: `No author found for ID: ${request.params.authorID}`,
    //     });
    // }

    if (!getSpecificAuthor) {
        return response.json({
            error: `No author found for ID ${request.params.authorID}`,
        });
    }

    return response.json({ author: getSpecificAuthor });
});

/*
Route           /authors/book
Description     to get a list of authors based on book
Access          PUBLIC
Parameters      isbn
Method          GET
*/
// MongoDB Optimized
Router.get("/book/:bookISBN", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificAuthorsByBook = database.authors.filter((author) =>
    //     author.books.includes(request.params.bookISBN)
    // );

    const getSpecificAuthorsByBook = await AuthorModel.find({
        books: request.params.bookISBN,
    });

    // error handling if author is not found
    // if (getSpecificAuthorsByBook.length === 0) {
    //     return response.json({
    //         error: `No author found for Book-ISBN: ${request.params.bookISBN}`,
    //     });
    // }

    if (!getSpecificAuthorsByBook) {
        return response.json({
            error: `No author found for Book-ISBN: ${request.params.bookISBN}`,
        });
    }

    return response.json({ authors: getSpecificAuthorsByBook });
});

/*
Route           /authors/new
Description     to post new author 
Access          PUBLIC
Parameters      NONE
Method          POST
*/
// MongoDB Optimized
Router.post("/new", async (request, response) => {
    try {
        const { newAuthor } = request.body;

        await AuthorModel.create(newAuthor);

        // return response.json({ authors: database.authors, message: "Author was added." });
        return response.json({
            message: "Author was added.",
        });
    } catch (error) {
        return response.json({ error: error.message });
    }
});

/*
Route           /authors/update
Description     to update author details(name)
Access          PUBLIC
Parameters      author-id
Method          PUT
*/
// MongoDB Optimized
Router.put("/update/:authorID", async (request, response) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(request.params.authorID),
        },
        {
            name: request.body.UpdateAuthorName,
        },
        { new: true }
    );

    // return response.json({
    //     authors: database.authors,
    //     message: "Author name was updated.",
    // });

    return response.json({
        authors: updatedAuthor,
        message: "Author name was updated.",
    });
});

/*
Route           /authors/delete
Description     to delete an author 
Access          PUBLIC
Parameters      author-id
Method          DELETE
*/
// MongoDB Optimized
Router.delete("/delete/:authorID", async (request, response) => {
    // update author database
    // const updatedAuthorDatabase = database.authors.filter(
    //     (author) => author.id !== parseInt(request.params.authorID)
    // );

    // database.authors = updatedAuthorDatabase;

    await AuthorModel.findOneAndDelete({
        id: parseInt(request.params.authorID),
    });

    // return response.json({
    //     authors: database.authors,
    //     message: `Author ${request.params.authorID} was deleted from author database.`,
    // });

    return response.json({
        message: `Author ${request.params.authorID} was deleted from author database.`,
    });
});

module.exports = Router;
