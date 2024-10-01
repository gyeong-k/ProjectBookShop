const express = require("express");
const router = require("router");

router.use(express.json());

router.post("/:id", (req, res) => {
  res.status(201).send("좋아요 추가");
});

router.delete("/:id", (req, res) => {
  res.status(201).send("좋아요 삭제");
});

module.exports = router;
