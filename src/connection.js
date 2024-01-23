const mysql = require("mysql2/promise");

module.exports = {
  connect: async function () {
    if (global.connection && global.connection.state !== "disconnected")
      return global.connection;

    const connection = await mysql.createConnection({
      host: process.env.dbHost || "localhost",
      port: process.env.dbPort || "3333",
      user: process.env.dbUser || "root",
      password: process.env.dbPass || "root",
      database: process.env.dbName || "users_schema",
    });

    await connection.connect((err) => {
      if (err) throw err;
      global.connection = connection;
    });

    return connection;
  },

  query: async function query(query) {
    const conn = await this.connect();
    const [rows] = await conn.query(query);
    return rows;
  },

  promise: async function query(queries) {
    const conn = await this.connect();
    const rows = await conn.beginTransaction(async (err) => {
      if (err) {
        throw err;
      }

      for await (query of queries) {
        if (!query) {
          return noMoreRows();
        }

        conn.query(query, (err) => {
          if (err) {
            conn.rollback(() => {
              throw err;
            });
          }
        });
      }

      let noMoreRows = () => {
        conn.commit((err) => {
          if (err) {
            conn.rollback(() => {
              throw err;
            });
          }
          console.log("success!");
        });
      };
    });

    console.log(rows);
    return rows;
  },
};
