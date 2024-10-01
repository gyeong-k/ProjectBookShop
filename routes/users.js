const express = require("express");
const router = require("router");

router.use(express.json());

router.post("/join", (req, res) => {
  res.status(201).send("회원가입");
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
