/* eslint-disable linebreak-style */
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
const Hapi = require("@hapi/hapi");
const appRoutes = require('./bookRoutes');

async function initializeServer() {
    try {
        const server = Hapi.server({
            port: 9000,
            host: 'localhost',
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            },
        });

        server.route(appRoutes);

        await server.start();
        console.log(`Server is running at ${server.info.uri}`);
    } catch (error) {
        console.log("Application error: " + error.message);
    }
}

initializeServer();
