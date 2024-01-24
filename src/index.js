const express = require("express");
const app = express();
const port = process.env.port || 3000;

const routes = require("./routes");

const db = require("./connection");

app.use(express.json())

app.listen(port, async () => {
  db.connect();

  console.log(`User service listening on port ${port}`);
});

app.use("/user", routes.user);
