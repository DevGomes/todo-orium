const pgp = require('pg-promise')();
const { Database: {
    conection: { user, password, host, port, database }
} } = require('../../bin/configuration/variables');


const db = pgp({
    user,
    password,
    host,
    port,
    database
});

module.exports = db;
