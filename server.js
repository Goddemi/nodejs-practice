const express = require("express");
const app = express();

let Database;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://goddemi0124:rkdcjf1!@goddemi.1vzb0je.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err); //에러 처리. url 오타로 인한 에러가 많다.

    Database = client.db("todoapp"); //투두앱 이라는 폴더를 데이터베이스로 가져온다.

    Database.collection("post").insertOne(
      { name: "강철", age: 32 },
      function (err, res) {
        console.log("저장완료");
      }
    );

    // post라는 파일에 insert 한다. 그냥 형식을 외우면 된다. 저장해두고 필요할 때 꺼내 쓰면 되는 형식.

    app.listen(8080, () => {
      console.log("server open in 8080");
    });
  }
);

//데이터 베이스 접속이 완료되면 서버를 만들어 주어라. 라는 의미.
//에러 처리.

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
