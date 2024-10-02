const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
  res.status(201).send("장바구니 담기");
});

router.post("/:id", (req, res) => {
  res.status(201).send("장바구니 조회");
});

router.delete("/", (req, res) => {
  res.status(201).send("장바구니 도서 삭제");
});

router.post("/:id", (req, res) => {
  res.status(201).send("장바구니서 선택한 주문 예상 상품 목록 조회");
});
module.exports = router;
