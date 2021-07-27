const books = [
    {
        ISBN: "12345one",
        title: "Getting started with MERN",
        authors: [1, 2, 3],
        language: "en",
        pubDate: "2002-12-31",
        numOfPages: 225,
        categories: ["education", "programming", "tech"],
        publication: 1,
    },
    {
        ISBN: "12345two",
        title: "How to not take things personally.",
        authors: [1,2],
        language: "en",
        pubDate: "2005-03-19",
        numOfPages: 134,
        categories: ["education", "psychology", "spiritual"],
        publication: 1,
    },
    {
        ISBN: "12345three",
        title: "Getting started with Life.",
        authors: [2],
        language: "en",
        pubDate: "2021-07-27",
        numOfPages: 120,
        categories: ["education", "personal", "mental"],
        publication: 2,
    },
];

const authors = [
    {
        id: 1,
        name: "Pavan",
        books: ["12345one"],
    },
    {
        id: 2,
        name: "Matthew",
        books: ["12345one","12345two"],
    },
    {
        id: 3,
        name: "Sarthak",
        books: ["12345one"],
    },
];

const publications = [
    {
        id: 1,
        name: "Chakra",
        books: ["12345one","12345two"],
    },
    {
        id: 2,
        name: "Angel",
        books: ["12345three"],
    },
];

module.exports = { books, authors, publications };
