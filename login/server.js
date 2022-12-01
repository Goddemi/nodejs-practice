const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "feature/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/feature/build/index.html"));
});

app.listen(8080, () => {
  console.log("hi");
});

const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("expree-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/fail" }), //이거 뜻이 local 인증을 통과하면 뒤의 함수를 실행해라 실패하면 저기로
  (req, res) => {
    res.redirect("/");
  }
);

//인증방법 설정하기 이거는 복붙하기.
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pwd",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);
