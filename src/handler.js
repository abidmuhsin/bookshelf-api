/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable key-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-const */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable prefer-template */
/* eslint-disable padded-blocks */
/* eslint-disable comma-dangle */
// eslint-disable-next-line quotes
const { nanoid } = require("nanoid");
const bookShelf = require('./bookshelf');

const addBookShelfHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(10);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    bookShelf.push(newBook);

    const isSuccess = bookShelf.some((book) => book.id === id);

    const response = isSuccess
        ? h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })
        : h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });

    response.code(isSuccess ? 201 : 500);
    return response;
};

const getAllBookShelfHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = [...bookShelf];

    if (name) {
        const lowerCaseName = name.toLowerCase();
        filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(lowerCaseName));
    }

    if (reading != null) {
        const isReading = reading === '1';
        filteredBooks = filteredBooks.filter(book => book.reading === isReading);
    }

    if (finished != null) {
        const isFinished = finished === '1';
        filteredBooks = filteredBooks.filter(book => book.finished === isFinished);
    }

    const response = h.response({
        status: 'success',
        data: {
            // eslint-disable-next-line no-shadow
            books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    });

    return response;
};

const getBookShelfByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = bookShelf.find((b) => b.id === id);

    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookShelfByIdHandler = (request, h) => {
    const { id } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const updateAt = new Date().toISOString();

    const index = bookShelf.findIndex((book) => book.id === id);

    if (index !== -1) {
        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        bookShelf[index] = {
            ...bookShelf[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt: updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookShelfByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = bookShelf.findIndex((book) => book.id === id);

    if (index !== -1) {
        bookShelf.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookShelfHandler,
    getAllBookShelfHandler,
    getBookShelfByIdHandler,
    editBookShelfByIdHandler,
    deleteBookShelfByIdHandler
};
