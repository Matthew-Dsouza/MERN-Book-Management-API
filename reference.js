// require("dotenv").config();

// // import express framework
// const express = require("express");

// // import mongoose
// const mongoose = require("mongoose");

// // database
// // CODE: before mongoDB
// // const database = require("./database/index");

// // models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");

// // initialize express
// const Bookman = express();

// // configurations
// Bookman.use(express.json());

// // Establish Database Connection
// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//     })
//     .then(() => console.log("Connection Established!"));

// /*
// Route           /books
// Description     to get all books
// Access          PUBLIC
// Parameters      NONE
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/books", async (_request, response) => {
//     const getAllBooks = await BookModel.find();

//     // CODE: before mongoDB
//     // return response.json({ books: database.books });

//     return response.json({ books: getAllBooks });
// });

// /*
// Route           /books/id
// Description     to get specific book based on ISBN
// Access          PUBLIC
// Parameters      isbn
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/books/id/:isbn", async (request, response) => {
//     const getSpecificBook = await BookModel.findOne({
//         ISBN: request.params.isbn,
//     });

//     // CODE: before mongoDB
//     // const getSpecificBook = await database.books.filter(
//     //     (book) => book.ISBN === request.params.isbn
//     // );

//     // error handling if book is not found
//     if (!getSpecificBook) {
//         return response.json({
//             error: `No book found for ISBN of ${request.params.isbn}`,
//         });
//     }

//     return response.json({ book: getSpecificBook });
// });

// /*
// Route           /books/category
// Description     to get a list of books based on category
// Access          PUBLIC
// Parameters      category
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/books/category/:category", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificBooksByCategory = database.books.filter(
//     //     (book) => book.categories.includes(request.params.category)
//     // );

//     const getSpecificBooksByCategory = await BookModel.find({
//         categories: request.params.category,
//     });

//     // error handling if book is not found
//     // if (getSpecificBooksByCategory.length === 0) {
//     //     return response.json({
//     //         error: `No book found for category of ${request.params.category}`,
//     //     });
//     // }

//     if (!getSpecificBooksByCategory) {
//         return response.json({
//             error: `No book found for category of ${request.params.category}`,
//         });
//     }

//     return response.json({ book: getSpecificBooksByCategory });
// });

// /*
// Route           /books/author
// Description     to get a list of books based on author
// Access          PUBLIC
// Parameters      author-id
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/books/author/:authorID", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificBooksByAuthor = database.books.filter((book) =>
//     //     book.authors.includes(parseInt(request.params.authorID))
//     // );

//     const getSpecificBooksByAuthor = await BookModel.find({
//         authors: parseInt(request.params.authorID),
//     });

//     // error handling if book is not found
//     // if (getSpecificBooksByAuthor.length === 0) {
//     //     return response.json({
//     //         error: `No book found for Author-ID: ${request.params.authorID}`,
//     //     });
//     // }
//     if (!getSpecificBooksByAuthor) {
//         return response.json({
//             error: `No book found for Author-ID: ${request.params.authorID}`,
//         });
//     }

//     return response.json({ books: getSpecificBooksByAuthor });
// });

// /*
// Route           /books/new
// Description     to post new book
// Access          PUBLIC
// Parameters      NONE
// Method          POST
// */
// // MongoDB Optimized
// Bookman.post("/books/new", async (request, response) => {
//     const { newBook } = request.body;

//     // CODE: before mongoDB
//     // inserting newBook data into database.books array
//     // database.books.push(newBook);

//     const addNewBook = BookModel.create(newBook);

//     // return response.json({ books: database.books, message: "Book was added." });
//     return response.json({ message: "New Book was added." });
// });

// /*
// Route           /books/update
// Description     to update book details(title)
// Access          PUBLIC
// Parameters      isbn
// Method          PUT
// */
// // NOTE: Had faced a horrible bug with this little devil.
// // MongoDB Optimized
// Bookman.put("/books/update/:isbn", async (request, response) => {
//     // CODE: before mongoDB
//     // database.books.forEach((book) => {
//     // if (book.ISBN === request.params.isbn) {
//     //     book.title = request.body.updatedBookTitle;
//     //     return book;
//     // }
//     // // error handling
//     // else {
//     //     return book;
//     // }

//     // .findOneAndUpdate({find one}, {and update}, {to display the updated data instead of old data})
//     const updatedBook = await BookModel.findOneAndUpdate(
//         { ISBN: request.params.isbn },
//         { title: request.body.updatedBookTitle },
//         { new: true }
//     );

//     // return response.json({
//     //     books: database.books,
//     //     message: "Book title was updated.",
//     // });

//     return response.json({
//         books: updatedBook,
//         message: "Book title was updated.",
//     });
// });

// /*
// Route           /books/author/update
// Description     to update/add new author
// Access          PUBLIC
// Parameters      isbn
// Method          PUT
// */
// // MongoDB Optimized
// Bookman.put("/books/author/update/:isbn", async (request, response) => {
//     // update the book database
//     // database.books.forEach((book) => {
//     //     if (book.ISBN === request.params.isbn) {
//     //         book.authors.push(request.body.newAuthor);
//     //         return book;
//     //     } else {
//     //         return book;
//     //     }
//     // });

//     const updatedBook = await BookModel.findOneAndUpdate(
//         { ISBN: request.params.isbn },
//         {
//             $addToSet: {
//                 authors: request.body.newAuthor,
//             },
//         },
//         { new: true }
//     );

//     // update the author database
//     // database.authors.forEach((author) => {
//     //     if (author.id === request.body.newAuthor) {
//     //         author.books.push(request.params.isbn);
//     //         return author;
//     //     } else {
//     //         return author;
//     //     }
//     // });

//     const updatedAuthor = await AuthorModel.findOneAndUpdate(
//         {
//             id: request.body.newAuthor,
//         },
//         {
//             $addToSet: {
//                 books: request.params.isbn,
//             },
//         },
//         { new: true }
//     );

//     // return response.json({
//     //     books: database.books,
//     //     authors: database.authors,
//     //     message: "Author was updated.",
//     // });

//     return response.json({
//         books: updatedBook,
//         authors: updatedAuthor,
//         message: "Author was updated.",
//     });
// });

// /*
// Route           /books/delete
// Description     to delete a book
// Access          PUBLIC
// Parameters      isbn
// Method          DELETE
// */
// // NOTE: Modify this code to update the author database as well when book is deleted
// // MongoDB Optimized
// Bookman.delete("/books/delete/:bookISBN", async (request, response) => {
//     // update book database
//     // const updatedBookDatabase = database.books.filter(
//     //     (book) => book.ISBN !== request.params.bookISBN
//     // );
//     // database.books = updatedBookDatabase;

//     const updatedBookDatabase = await BookModel.findOneAndDelete({
//         ISBN: request.params.bookISBN,
//     });

//     // return response.json({
//     //     books: database.books,
//     //     message: `Book ${request.params.bookISBN} was deleted from book database.`,
//     // });

//     return response.json({
//         message: `Book ${request.params.bookISBN} was deleted from book database.`,
//     });
// });

// /*
// Route           /books/author/delete
// Description     to delete an author from a book
// Access          PUBLIC
// Parameters      isbn
// Method          DELETE
// */
// // MongoDB Optimized
// Bookman.delete("/books/author/delete/:bookISBN", async (request, response) => {
//     // update book database
//     // database.books.forEach((book) => {
//     //     if (book.ISBN === request.params.bookISBN) {
//     //         const updatedAuthorList = book.authors.filter(
//     //             (bookAuthor) => bookAuthor !== request.body.removeAuthorID
//     //         );

//     //         book.authors = updatedAuthorList;

//     //         return book;
//     //     } else {
//     //         return book;
//     //     }
//     // });

//     const updatedBook = await BookModel.findOneAndUpdate(
//         {
//             ISBN: request.params.bookISBN,
//         },
//         {
//             $pull: {
//                 authors: request.body.removeAuthorID,
//             },
//         },
//         { new: true }
//     );

//     /* NOTE: You don't need to assign the changed database.books to updatedBookDatabase
//              since in forEach all changes are made directly to database.books */
//     // database.books = updatedBookDatabase;

//     // update author database
//     // database.authors.forEach((author) => {
//     //     if (author.id === request.body.removeAuthorID) {
//     //         const updatedBooksList = author.books.filter(
//     //             (authorBook) => authorBook !== request.params.bookISBN
//     //         );

//     //         author.books = updatedBooksList;

//     //         return author;
//     //     } else {
//     //         return author;
//     //     }
//     // });

//     const updatedAuthor = await AuthorModel.findOneAndUpdate(
//         {
//             id: request.body.removeAuthorID,
//         },
//         {
//             $pull: {
//                 books: request.params.bookISBN,
//             },
//         },
//         { new: true }
//     );

//     // return response.json({
//     //     books: database.books,
//     //     authors: database.authors,
//     //     message: `Author ${request.body.removeAuthorID} was removed from Book ${request.params.bookISBN}`,
//     // });

//     return response.json({
//         books: updatedBook,
//         authors: updatedAuthor,
//         message: `Author ${request.body.removeAuthorID} was removed from Book ${request.params.bookISBN}`,
//     });
// });

// // .

// // .

// // .

// /*
// Route           /authors
// Description     to get all authors
// Access          PUBLIC
// Parameters      NONE
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/authors", async (_request, response) => {
//     const getAllAuthors = await AuthorModel.find();

//     // return response.json({ authors: database.authors });
//     return response.json({ authors: getAllAuthors });
// });

// /*
// Route           /authors/id
// Description     to get specific author based on author id
// Access          PUBLIC
// Parameters      author-id
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/authors/id/:authorID", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificAuthor = database.authors.filter(
//     //     // you can either convert param to int or author.id to string it works either way
//     //     (author) => author.id === parseInt(request.params.authorID)
//     //     // (author) => String(author.id) === request.params.authorID
//     // );

//     const getSpecificAuthor = await AuthorModel.findOne({
//         id: parseInt(request.params.authorID),
//     });

//     // error handling if author is not found
//     // if (getSpecificAuthor.length === 0) {
//     //     return response.json({
//     //         error: `No author found for ID: ${request.params.authorID}`,
//     //     });
//     // }

//     if (!getSpecificAuthor) {
//         return response.json({
//             error: `No author found for ID ${request.params.authorID}`,
//         });
//     }

//     return response.json({ author: getSpecificAuthor });
// });

// /*
// Route           /authors/book
// Description     to get a list of authors based on book
// Access          PUBLIC
// Parameters      isbn
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/authors/book/:bookISBN", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificAuthorsByBook = database.authors.filter((author) =>
//     //     author.books.includes(request.params.bookISBN)
//     // );

//     const getSpecificAuthorsByBook = await AuthorModel.find({
//         books: request.params.bookISBN,
//     });

//     // error handling if author is not found
//     // if (getSpecificAuthorsByBook.length === 0) {
//     //     return response.json({
//     //         error: `No author found for Book-ISBN: ${request.params.bookISBN}`,
//     //     });
//     // }

//     if (!getSpecificAuthorsByBook) {
//         return response.json({
//             error: `No author found for Book-ISBN: ${request.params.bookISBN}`,
//         });
//     }

//     return response.json({ authors: getSpecificAuthorsByBook });
// });

// /*
// Route           /authors/new
// Description     to post new author 
// Access          PUBLIC
// Parameters      NONE
// Method          POST
// */
// // MongoDB Optimized
// Bookman.post("/authors/new", (request, response) => {
//     const { newAuthor } = request.body;

//     // CODE: before mongoDB
//     // inserting newAuthor data into database.authors array
//     // database.authors.push(newAuthor);

//     const addNewAuthor = AuthorModel.create(newAuthor);

//     // return response.json({ authors: database.authors, message: "Author was added." });
//     return response.json({
//         message: "Author was added.",
//     });
// });

// /*
// Route           /authors/update
// Description     to update author details(name)
// Access          PUBLIC
// Parameters      author-id
// Method          PUT
// */
// Bookman.put("/authors/update/:authorID", async (request, response) => {
//     database.authors.forEach((author) => {
//         if (String(author.id) === request.params.authorID) {
//             author.name = request.body.UpdateAuthorName;
//             return author;
//         } else {
//             return author;
//         }
//     });

//     return response.json({
//         authors: database.authors,
//         message: "Author name was updated.",
//     });
// });

// /*
// Route           /authors/delete
// Description     to delete an author 
// Access          PUBLIC
// Parameters      author-id
// Method          DELETE
// */
// Bookman.delete("/authors/delete/:authorID", (request, response) => {
//     // update author database
//     const updatedAuthorDatabase = database.authors.filter(
//         (author) => author.id !== parseInt(request.params.authorID)
//     );

//     database.authors = updatedAuthorDatabase;

//     return response.json({
//         authors: database.authors,
//         message: "Author was deleted from author database.",
//     });
// });

// // .

// // .

// // .

// /*
// Route           /publications
// Description     to get all publications
// Access          PUBLIC
// Parameters      NONE
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/publications", async (_request, response) => {
//     const getAllPublications = await PublicationModel.find();

//     // return response.json({ publications: database.publications });
//     return response.json({ publications: getAllPublications });
// });

// /*
// Route           /publications/id
// Description     to get specific publication based on publication id
// Access          PUBLIC
// Parameters      publication-id
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/publications/id/:publicationID", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificPublication = database.publications.filter(
//     //     (publication) =>
//     //         publication.id === parseInt(request.params.publicationID)
//     // );

//     const getSpecificPublication = await PublicationModel.findOne({
//         id: parseInt(request.params.publicationID),
//     });

//     // error handling if publication is not found
//     // if (getSpecificPublication.length === 0) {
//     //     return response.json({
//     //         error: `No publication found for ID: ${request.params.publicationID}`,
//     //     });
//     // }

//     if (!getSpecificPublication) {
//         return response.json({
//             error: `No publication found for ID: ${request.params.publicationID}`,
//         });
//     }

//     return response.json({ publication: getSpecificPublication });
// });

// /*
// Route           /publications/book
// Description     to get a specific publication based on book
// Access          PUBLIC
// Parameters      isbn
// Method          GET
// */
// // MongoDB Optimized
// Bookman.get("/publications/book/:bookISBN", async (request, response) => {
//     // CODE: before mongoDB
//     // const getSpecificPublicationByBook = database.publications.filter(
//     //     (publication) => publication.books.includes(request.params.bookISBN)
//     // );

//     const getSpecificPublicationByBook = await PublicationModel.findOne({
//         books: request.params.bookISBN,
//     });

//     // error handling if publication is not found
//     // if (getSpecificPublicationByBook.length === 0) {
//     //     return response.json({
//     //         error: `No publication found for Book-ISBN: ${request.params.bookISBN}`,
//     //     });
//     // }

//     if (!getSpecificPublicationByBook) {
//         return response.json({
//             error: `No publication found for Book-ISBN: ${request.params.bookISBN}`,
//         });
//     }

//     return response.json({ publication: getSpecificPublicationByBook });
// });

// /*
// Route           /publications/new
// Description     to post new publication
// Access          PUBLIC
// Parameters      NONE
// Method          POST
// */
// // MongoDB Optimized
// Bookman.post("/publications/new", async (request, response) => {
//     const { newPublication } = request.body;

//     // CODE: before mongoDB
//     // inserting newPublication data into database.publications array
//     // database.publications.push(newPublication);

//     const addNewPublication = await PublicationModel.create(newPublication);

//     // return response.json({ publications: database.publications, message: "Publication was added." });
//     return response.json({
//         message: "Publication was added.",
//     });
// });

// /*
// Route           /publications/update
// Description     to update publications details(name)
// Access          PUBLIC
// Parameters      publication-id
// Method          PUT
// */
// Bookman.put(
//     "/publications/update/:publicationID",
//     async (request, response) => {
//         database.publications.forEach((publication) => {
//             if (String(publication.id) === request.params.publicationID) {
//                 publication.name = request.body.UpdatePublicationName;
//                 return publication;
//             } else {
//                 return publication;
//             }
//         });

//         return response.json({
//             publications: database.publications,
//             message: "Publication name was updated.",
//         });
//     }
// );

// /*
// Route           /publications/book/update
// Description     to update/add new book to a publication
// Access          PUBLIC
// Parameters      isbn
// Method          PUT
// */
// Bookman.put(
//     "/publications/book/update/:bookISBN",
//     async (request, response) => {
//         // update publication database
//         database.publications.forEach((publication) => {
//             if (
//                 publication.id === request.body.updatedPublicationID &&
//                 publication.books.includes(request.params.bookISBN) == false
//             ) {
//                 publication.books.push(request.params.bookISBN);
//                 return publication;
//             } else {
//                 return publication;
//             }
//         });

//         // update book database
//         database.books.forEach((book) => {
//             if (book.ISBN === request.params.bookISBN) {
//                 book.publication = request.body.updatedPublicationID;
//                 return book;
//             } else {
//                 return book;
//             }
//         });

//         return response.json({
//             publications: database.publications,
//             books: database.books,
//             message: "Book Publication was updated.",
//         });
//     }
// );

// /*
// Route           /publications/book/delete
// Description     to delete a book from a publication  
// Access          PUBLIC
// Parameters      isbn, publication-id
// Method          DELETE
// */
// Bookman.delete(
//     "/publications/book/delete/:bookISBN/:publicationID",
//     async (request, response) => {
//         // update publication database
//         database.publications.forEach((publication) => {
//             if (publication.id === parseInt(request.params.publicationID)) {
//                 const updatedPublicationBooksList = publication.books.filter(
//                     (publicationBook) =>
//                         publicationBook !== request.params.bookISBN
//                 );

//                 publication.books = updatedPublicationBooksList;

//                 return publication;
//             } else {
//                 return publication;
//             }
//         });

//         // update book database
//         database.books.forEach((book) => {
//             if (book.ISBN === request.params.bookISBN) {
//                 book.publication = "N/A"; //Not Announced i.e No publication

//                 return book;
//             } else {
//                 return book;
//             }
//         });

//         return response.json({
//             publications: database.publications,
//             books: database.books,
//             message: `Book ${request.params.bookISBN} was deleted from Publication ${request.params.publicationID}`,
//         });
//     }
// );

// /*
// Route           /publications/delete
// Description     to delete a publication 
// Access          PUBLIC
// Parameters      publication-id
// Method          DELETE
// */
// Bookman.delete("/publications/delete/:publicationID", (request, response) => {
//     const updatedPublicationDatabase = database.publications.filter(
//         (publication) =>
//             publication.id !== parseInt(request.params.publicationID)
//     );

//     database.publications = updatedPublicationDatabase;

//     return response.json({
//         publications: database.publications,
//         message: "Publication was deleted.",
//     });
// });

// // .

// // .

// // .

// Bookman.listen(4000, () => console.log("Server is running (●'w'●)"));
