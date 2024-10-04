const express = require("express");
const router = express.Router();
//const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { allBooks, bookDetail } = require("../controller/BookController");

router.use(express.json());

//router.get("/", booksByCategory);
router.get("/", allBooks); //(카테고리별) 전체 조회
router.get("/:id", bookDetail);

module.exports = router;
