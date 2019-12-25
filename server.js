const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// create application/json parser
const jsonParser = bodyParser.json()

app.set("port", process.env.PORT || 3001);

app.post("/api/cubes", jsonParser, (req, res) => {
  console.log('REQUEST BODY', req.body);
  res.send({"success": "true", "hello": "world"});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
