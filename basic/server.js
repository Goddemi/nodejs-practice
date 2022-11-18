const express = require("express");
const app = express();

let Database;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://goddemi0124:rkdcjf1!@goddemi.1vzb0je.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err); //에러 처리. url 오타로 인한 에러가 많다.

    Database = client.db("todoapp"); //투두앱 이라는 폴더를 데이터베이스로 가져온다.

    app.use(express.urlencoded({ extended: true }));

    // app.get("/pet", function (req, res) {
    //   res.send("Hi nice to meet you");
    // });

    app.get("/beauty", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/add", (req, response) => {
      let localTotalPost;

      Database.collection("counter").findOne(
        { name: "게시물갯수" },
        function (err, result) {
          localTotalPost = result.totalPost;

          Database.collection("post").insertOne(
            {
              _id: localTotalPost,
              name: req.body.title,
              detail: req.body.detail,
            },
            function (err, res) {
              console.log("저장완료");
            }
          );
        }
      );

      Database.collection("counter").updateOne(
        { name: "게시물갯수" },
        {
          $inc: { totalPost: 1 },
          function(err, res) {
            if (err) {
              console.log(err);
            }
          },
        }
      );

      response.send("전송완료");
    });
    // add라는 이름으로 들어와서 post요청을 하면, 그놈이 post한 것들을 Database "post" 컬렉션 안에 집어넣어라!

    app.delete("/delete", function (req, response) {
      req.body._id = parseInt(req.body._id);

      Database.collection("post").deleteOne(
        { _id: req.body._id },
        function (err, result) {
          response.status(200).send({ message: "성공햇습니다." });
          // response.status(400).send({ message: "400 error" }); // stats(200 or 400 or 500) <-- status값에 따라서 브라우저에서 성공 / 실패를 인식한다.
        }
      );
    });

    //상세페이지 만들기
    app.get("/detail/:id", function (req, res) {
      Database.collection("post").findOne(
        { _id: parseInt(req.params.id) }, // 안되서 봤더니 데이터베이스 안에 들어 있는 값의 자료형이 number였다.
        function (err, result) {
          res.render("어느파일에 보내줘?ex) list.ejs", { data: result });
        }
      );
    });

    app.get("/list", function (req, response) {
      Database.collection("post")
        .find()
        .toArray(function (err, result) {
          response.render("url", { post: result });
        });
    });

    // list라는 이름으로 들어와서 get요청을 하면, post라는 컬렉션에 들어있는 자료들을 찾아서, 어레이로 만들어서 보내주어라~
    // result 데이터를 post 라는 이름으로 url 파일에 보내주세요~

    app.listen(8080, () => {
      console.log("server open in 8080");
    });
  }
);

//데이터 베이스 접속이 완료되면 서버를 만들어 주어라. 라는 의미.
//에러 처리.

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("expree-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
