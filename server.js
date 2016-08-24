
let Express = require("express");

let app = new Express();
let port = process.env.PORT || 3000;

app.use("/static", Express.static("static"));
app.get("/*", (request, response) => response.sendFile(__dirname + "/index.html"));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});

