
let Express = require("express");

let app = new Express();
let port = process.env.PORT || 3000;

app.get("*", (request, response) => response.sendFile(__dirname + "/index.html"))

app.listen(port);

