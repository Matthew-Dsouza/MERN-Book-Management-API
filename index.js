// import express framework
const { request, response } = require("express");
const express = require("express");

// database
const database = require("./database/index");

// initialize express
const Bookman = express();

// configurations
Bookman.use(express.json());

/*
Route           /books
Description     to get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bookman.get("/books", (request, response) => {
    return response.json({ books: database.books });
});

/*
Route           /books/id
Description     to get specific book based on ISBN 
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bookman.get("/books/id/:isbn", (request, response) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
    );

    // error handling if book is not found
    if (getSpecificBook.length === 0) {
        return response.json({
            error: `No book found for ISBN of ${request.params.isbn}`,
        });
    }

    return response.json({ book: getSpecificBook });
});

/*
Route           /books/category
Description     to get a list of books based on category 
Access          PUBLIC
Parameters      category
Method          GET
*/
Bookman.get("/books/category/:category", (request, response) => {
    const getSpecificBooksByCategory = database.books.filter(
        (book) => book.categories.includes(request.params.category)
        // book.categories === request.params.category;
    );

    // error handling if book is not found
    if (getSpecificBooksByCategory.length === 0) {
        return response.json({
            error: `No book found for category of ${request.params.category}`,
        });
    }

    return response.json({ book: getSpecificBooksByCategory });
});

/*
Route           /books/author
Description     to get a list of books based on author 
Access          PUBLIC
Parameters      author-id
Method          GET
*/
Bookman.get("/books/author/:authorID", (request, response) => {
    const getSpecificBooksByAuthor = database.books.filter((book) =>
        book.authors.includes(parseInt(request.params.authorID))
    );

    // error handling if book is not found
    if (getSpecificBooksByAuthor.length === 0) {
        return response.json({
            error: `No book found for Author-ID: ${request.params.authorID}`,
        });
    }

    return response.json({ books: getSpecificBooksByAuthor });
});

/*
Route           /authors
Description     to get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bookman.get("/authors", (request, response) => {
    return response.json({ authors: database.authors });
});

/*
Route           /authors/id
Description     to get specific author based on author id
Access          PUBLIC
Parameters      author-id
Method          GET
*/
Bookman.get("/authors/id/:authorID", (request, response) => {
    const getSpecificAuthor = database.authors.filter(
        // you can either convert param to int or author.id to string it works either way
        (author) => author.id === parseInt(request.params.authorID)
        // (author) => String(author.id) === request.params.authorID
    );

    // error handling if author is not found
    if (getSpecificAuthor.length === 0) {
        return responsejson({
            error: `No author found for ID: ${request.params.authorID}`,
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
Bookman.get("/authors/book/:bookISBN", (request, response) => {
    const getSpecificAuthorsByBook = database.authors.filter((author) =>
        author.books.includes(request.params.bookISBN)
    );

    // error handling if author is not found
    if (getSpecificAuthorsByBook.length === 0) {
        return response.json({
            error: `No author found for Book-ISBN: ${request.params.bookISBN}`,
        });
    }

    return response.json({ authors: getSpecificAuthorsByBook });
});

/*
Route           /publications
Description     to get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bookman.get("/publications", (request, response) => {
    return response.json({ publications: database.publications });
});

/*
Route           /publications/id
Description     to get specific publication based on publication id
Access          PUBLIC
Parameters      publication-id
Method          GET
*/
Bookman.get("/publications/id/:publicationID", (request, response) => {
    const getSpecificPublication = database.publications.filter(
        (publication) =>
            publication.id === parseInt(request.params.publicationID)
    );

    // error handling if publication is not found
    if (getSpecificPublication.length === 0) {
        return response.json({
            error: `No publication found for ID: ${request.params.publicationID}`,
        });
    }

    return response.json({ publication: getSpecificPublication });
});

/*
Route           /publications/book
Description     to get a specific publication based on book
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bookman.get("/publications/book/:bookISBN", (request, response) => {
    const getSpecificPublicationByBook = database.publications.filter(
        (publication) => publication.books.includes(request.params.bookISBN)
    );

    // error handling if publication is not found
    if (getSpecificPublicationByBook.length === 0) {
        return response.json({
            error: `No publication found for Book-ISBN: ${request.params.bookISBN}`,
        });
    }

    return response.json({ publication: getSpecificPublicationByBook });
});

// .

// .

Bookman.listen(4000, () => console.log("Server is running (●'w'●)"));
