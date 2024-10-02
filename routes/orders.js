const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
  res.status(201).send("주문하기");
});

router.get("/:id", (req, res) => {
  res.status(201).send("주문 목록 조회");
});

router.get("/:id", (req, res) => {
  res.status(201).send("주문 상세 상품 조회");
});

module.exports = router;
