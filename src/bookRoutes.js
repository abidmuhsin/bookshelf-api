/* eslint-disable linebreak-style */
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
const { 
    addBookShelfHandler, 
    getAllBookShelfHandler, 
    getBookShelfByIdHandler, 
    editBookShelfByIdHandler, 
    deleteBookShelfByIdHandler 
} = require('./handler');  

const bookRoutes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookShelfHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookShelfHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookShelfByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookShelfByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookShelfByIdHandler,
    },
];

module.exports = bookRoutes;
