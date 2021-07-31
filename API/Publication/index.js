// Prefix  : /publications

const Router = require("express").Router();

// Database Model
const PublicationModel = require("../../database/publication");

/*
Route           /publications
Description     to get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
// MongoDB Optimized
Router.get("/", async (_request, response) => {
    const getAllPublications = await PublicationModel.find();

    // return response.json({ publications: database.publications });
    return response.json({ publications: getAllPublications });
});

/*
Route           /publications/id
Description     to get specific publication based on publication id
Access          PUBLIC
Parameters      publication-id
Method          GET
*/
// MongoDB Optimized
Router.get("/id/:publicationID", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificPublication = database.publications.filter(
    //     (publication) =>
    //         publication.id === parseInt(request.params.publicationID)
    // );

    const getSpecificPublication = await PublicationModel.findOne({
        id: parseInt(request.params.publicationID),
    });

    // error handling if publication is not found
    // if (getSpecificPublication.length === 0) {
    //     return response.json({
    //         error: `No publication found for ID: ${request.params.publicationID}`,
    //     });
    // }

    if (!getSpecificPublication) {
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
// MongoDB Optimized
Router.get("/book/:bookISBN", async (request, response) => {
    // CODE: before mongoDB
    // const getSpecificPublicationByBook = database.publications.filter(
    //     (publication) => publication.books.includes(request.params.bookISBN)
    // );

    const getSpecificPublicationByBook = await PublicationModel.findOne({
        books: request.params.bookISBN,
    });

    // error handling if publication is not found
    // if (getSpecificPublicationByBook.length === 0) {
    //     return response.json({
    //         error: `No publication found for Book-ISBN: ${request.params.bookISBN}`,
    //     });
    // }

    if (!getSpecificPublicationByBook) {
        return response.json({
            error: `No publication found for Book-ISBN: ${request.params.bookISBN}`,
        });
    }

    return response.json({ publication: getSpecificPublicationByBook });
});

/*
Route           /publications/new
Description     to post new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
// MongoDB Optimized
Router.post("/new", async (request, response) => {
    try {
        const { newPublication } = request.body;

        const addNewPublication = await PublicationModel.create(newPublication);

        return response.json({
            message: "Publication was added.",
        });
    } catch (error) {
        return response.json({ error: error.message });
    }
});

/*
Route           /publications/update
Description     to update publications details(name)
Access          PUBLIC
Parameters      publication-id
Method          PUT
*/
// MongoDB Optimized
Router.put("/update/:publicationID", async (request, response) => {
    // database.publications.forEach((publication) => {
    //     if (String(publication.id) === request.params.publicationID) {
    //         publication.name = request.body.UpdatePublicationName;
    //         return publication;
    //     } else {
    //         return publication;
    //     }
    // });

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: parseInt(request.params.publicationID),
        },
        {
            name: request.body.UpdatePublicationName,
        },
        { new: true }
    );

    // return response.json({
    //     publications: database.publications,
    //     message: "Publication name was updated.",
    // });

    return response.json({
        publication: updatedPublication,
        message: "Publication name was updated.",
    });
});

/*
Route           /publications/book/update
Description     to update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
// MongoDB Optimized
Router.put("/book/update/:bookISBN", async (request, response) => {
    // update publication database
    // database.publications.forEach((publication) => {
    //     if (
    //         publication.id === request.body.updatedPublicationID &&
    //         publication.books.includes(request.params.bookISBN) == false
    //     ) {
    //         publication.books.push(request.params.bookISBN);
    //         return publication;
    //     } else {
    //         return publication;
    //     }
    // });

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: request.body.updatedPublicationID,
        },
        {
            $addToSet: {
                books: request.params.bookISBN,
            },
        },
        { new: true }
    );

    // update book database
    // database.books.forEach((book) => {
    //     if (book.ISBN === request.params.bookISBN) {
    //         book.publication = request.body.updatedPublicationID;
    //         return book;
    //     } else {
    //         return book;
    //     }
    // });

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: request.params.bookISBN,
        },
        {
            publication: request.body.updatedPublicationID,
        },
        { new: true }
    );

    // return response.json({
    //     publications: database.publications,
    //     books: database.books,
    //     message: "Book Publication was updated.",
    // });

    return response.json({
        publications: updatedPublication,
        books: updatedBook,
        message: `Book ${request.params.bookISBN} was added to Publication ${request.body.updatedPublicationID}.`,
    });
});

/*
Route           /publications/book/delete
Description     to delete a book from a publication  
Access          PUBLIC
Parameters      isbn, publication-id
Method          DELETE
*/
// MongoDB Optimized
Router.delete(
    "/book/delete/:bookISBN/:publicationID",
    async (request, response) => {
        // update publication database
        // database.publications.forEach((publication) => {
        //     if (publication.id === parseInt(request.params.publicationID)) {
        //         const updatedPublicationBooksList = publication.books.filter(
        //             (publicationBook) =>
        //                 publicationBook !== request.params.bookISBN
        //         );

        //         publication.books = updatedPublicationBooksList;

        //         return publication;
        //     } else {
        //         return publication;
        //     }
        // });

        const updatedPublication = await PublicationModel.findOneAndUpdate(
            {
                id: request.params.publicationID,
            },
            {
                $pull: {
                    books: request.params.bookISBN,
                },
            },
            {
                new: true,
            }
        );

        // update book database
        // database.books.forEach((book) => {
        //     if (book.ISBN === request.params.bookISBN) {
        //         book.publication = "N/A"; //Not Announced i.e No publication

        //         return book;
        //     } else {
        //         return book;
        //     }
        // });

        const updatedBook = await BookModel.findOneAndUpdate(
            {
                ISBN: request.params.bookISBN,
            },
            {
                // publication: "N/A",
                publication: 0,
            },
            {
                new: true,
            }
        );

        // return response.json({
        //     publications: database.publications,
        //     books: database.books,
        //     message: `Book ${request.params.bookISBN} was deleted from Publication ${request.params.publicationID}`,
        // });

        return response.json({
            publications: updatedPublication,
            book: updatedBook,
            message: `Book ${request.params.bookISBN} was deleted from Publication ${request.params.publicationID}`,
        });
    }
);

/*
Route           /publications/delete
Description     to delete a publication 
Access          PUBLIC
Parameters      publication-id
Method          DELETE
*/
// MongoDB Optimized
Router.delete("/delete/:publicationID", async (request, response) => {
    // const updatedPublicationDatabase = database.publications.filter(
    //     (publication) =>
    //         publication.id !== parseInt(request.params.publicationID)
    // );

    // database.publications = updatedPublicationDatabase;

    await PublicationModel.findOneAndDelete({
        id: request.params.publicationID,
    });

    // return response.json({
    //     publications: database.publications,
    //     message: "Publication was deleted.",
    // });

    return response.json({
        message: `Publication ${request.params.publicationID} was deleted.`,
    });
});

module.exports = Router;
