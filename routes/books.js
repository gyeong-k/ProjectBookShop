const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
  res.status(201).send("전체 도서 조회");
});

router.post("/:id", (req, res) => {
  res.status(201).send("개별 도서 조회");
});

router.post("/", (req, res) => {
  res.status(201).send("카테고리별 도서 목록 조회");
});

module.exports = router;
