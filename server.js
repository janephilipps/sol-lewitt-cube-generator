const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

app.get("/api/cubes", (req, res) => {
  res.send({"success": "true", "hello": "world"});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
