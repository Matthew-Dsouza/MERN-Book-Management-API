// Prefix  : /books

// Initializing Express Router
const Router = require("express").Router();

// Database Model
const BookModel = require("../../database/book");
const AuthorModel = require("../../database/author");
const PublicationModel = require("../../database/publication");

/*
Route           /books
Description     to get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
// MongoDB Optimized
Router.get("/", async (_request, response) => {
    const getAllBooks = await BookModel.find();

    return response.json({ books: getAllBooks });
});

/*
Route           /books/id
Description     to get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
// MongoDB Optimized
Router.get("/isbn/:isbn", async (request, response) => {
    const getSpecificBook = await BookModel.findOne({
        ISBN: request.params.isbn,
    });

    // error handling if book is not found
    if (!getSpecificBook) {
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
// MongoDB Optimized
Router.get("/category/:category", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificBooksByCategory = database.books.filter(
    //     (book) => book.categories.includes(request.params.category)
    // );

    const getSpecificBooksByCategory = await BookModel.find({
        categories: request.params.category,
    });

    // error handling if book is not found
    // if (getSpecificBooksByCategory.length === 0) {
    //     return response.json({
    //         error: `No book found for category of ${request.params.category}`,
    //     });
    // }

    if (!getSpecificBooksByCategory) {
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
// MongoDB Optimized
Router.get("/author/:authorID", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificBooksByAuthor = database.books.filter((book) =>
    //     book.authors.includes(parseInt(request.params.authorID))
    // );

    const getSpecificBooksByAuthor = await BookModel.find({
        authors: parseInt(request.params.authorID),
    });

    // error handling if book is not found
    // if (getSpecificBooksByAuthor.length === 0) {
    //     return response.json({
    //         error: `No book found for Author-ID: ${request.params.authorID}`,
    //     });
    // }
    if (!getSpecificBooksByAuthor) {
        return response.json({
            error: `No book found for Author-ID: ${request.params.authorID}`,
        });
    }

    return response.json({ books: getSpecificBooksByAuthor });
});

/*
Route           /books/new
Description     to post new book
Access          PUBLIC
Parameters      NONE
Method          POST
*/
// MongoDB Optimized
Router.post("/new", async (request, response) => {
    try {
        const { newBook } = request.body;

        await BookModel.create(newBook);

        return response.json({ message: "New Book was added." });
    } catch (error) {
        return response.json({ error: error.message });
    }
});

/*
Route           /books/update
Description     to update book details(title)
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
// NOTE: Had faced a horrible bug with this little devil.
// MongoDB Optimized
Router.put("/update/:isbn", async (request, response) => {
    // .findOneAndUpdate({find one}, {and update}, {to display the updated data instead of old data})
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: request.params.isbn },
        { title: request.body.updatedBookTitle },
        { new: true }
    );

    return response.json({
        books: updatedBook,
        message: "Book title was updated.",
    });
});

/*
Route           /books/author/update
Description     to update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
// MongoDB Optimized
Router.put("/author/update/:isbn", async (request, response) => {
    // update the book database

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: request.params.isbn },
        {
            $addToSet: {
                authors: request.body.newAuthor,
            },
        },
        { new: true }
    );

    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: request.body.newAuthor,
        },
        {
            $addToSet: {
                books: request.params.isbn,
            },
        },
        { new: true }
    );

    return response.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: `Author ${request.body.newAuthor} was added to book ${request.params.isbn}`,
    });
});

/*
Route           /books/delete
Description     to delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
// NOTE: Modify this code to update the author database as well when book is deleted
// MongoDB Optimized
Router.delete("/delete/:bookISBN", async (request, response) => {
    // update book database
    // const updatedBookDatabase = database.books.filter(
    //     (book) => book.ISBN !== request.params.bookISBN
    // );
    // database.books = updatedBookDatabase;

    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: request.params.bookISBN,
    });

    // return response.json({
    //     books: database.books,
    //     message: `Book ${request.params.bookISBN} was deleted from book database.`,
    // });

    return response.json({
        message: `Book ${request.params.bookISBN} was deleted from book database.`,
    });
});

/*
Route           /books/author/delete
Description     to delete an author from a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
// MongoDB Optimized
Router.delete("/author/delete/:bookISBN", async (request, response) => {
    // update book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: request.params.bookISBN,
        },
        {
            $pull: {
                authors: request.body.removeAuthorID,
            },
        },
        { new: true }
    );

    // update author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: request.body.removeAuthorID,
        },
        {
            $pull: {
                books: request.params.bookISBN,
            },
        },
        { new: true }
    );

    // return response.json({
    //     books: database.books,
    //     authors: database.authors,
    //     message: `Author ${request.body.removeAuthorID} was removed from Book ${request.params.bookISBN}`,
    // });

    return response.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: `Author ${request.body.removeAuthorID} was removed from Book ${request.params.bookISBN}`,
    });
});

module.exports = Router;
