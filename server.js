const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log("server open in 8080");
});

app.use(express.urlencoded({ extended: true }));

app.get("/pet", function (req, res) {
  res.send("Hi nice to meet you");
});

app.get("/beauty", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  res.send("전송완료");
});
