
let Express = require("express");

let app = new Express();
let port = process.env.PORT || 3000;

app.get("/css-challenge/", (request, response) => response.sendFile(__dirname + "/css-challenge/index.html"));
app.get("/css-challenge/stylesheet.css", (request, response) => response.sendFile(__dirname + "/css-challenge/stylesheet.css"));
app.use("/static", Express.static("static"));
app.get("/main.css", (request, response) => response.sendFile(__dirname + "/main.css"));
app.get("/*", (request, response) => response.sendFile(__dirname + "/index.html"));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});

