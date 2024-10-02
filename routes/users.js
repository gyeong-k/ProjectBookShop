const express = require("express");
const router = express.Router();
const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");

router.use(express.json());

//회원가입
router.post("/join", (req, res) => {
  const { email, password } = req.body;

  let sql = "INSERT INTO users (email, password) VALUES (?,?)";
  let values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
});

router.post("/login", (req, res) => {
  res.status(200).send("로그인"); //  토큰
});
//비번 초기화 요청
router.post("/reset", (req, res) => {
  res.status(200).send("비번 초기화 요청"); //
});
//비번 초기화 (수정)
router.put("/reset", (req, res) => {
  res.status(200).send("비번 초기화"); //
});

module.exports = router;
