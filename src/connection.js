const mysql = require('mysql2/promise');

const connection = {
    connect: async function () {
        if (global.connection && global.connection.state !== 'disconnected') return global.connection;

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || '3333',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'root',
            database: process.env.DB_NAME || 'users_schema',
        });

        await connection.connect((err) => {
            if (err) throw err;
            global.connection = connection;
        });

        await connection.query('USE users_schema;');

        return connection;
    },

    query: async function (query) {
        try {
            const conn = await connection.connect();
            const [rows] = await conn.query(query);
            return rows;
        } catch (err) {
            throw { error: err, message: err.message, success: false };
        }
    },

    transaction: async function (queries) {
        const conn = await connection.connect();
        try {
            await conn.beginTransaction();
            const queryPromises = [];

            queries.forEach((query) => {
                queryPromises.push(conn.query(query));
            });
            const results = await Promise.all(queryPromises);
            await conn.commit();
            await conn.end();
            return results;
        } catch (err) {
            console.log(err);
            await conn.rollback();
            await conn.end();
            return Promise.reject(err);
        }
    },
};

module.exports = connection;
