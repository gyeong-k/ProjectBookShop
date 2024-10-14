const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");

const order = (req, res) => {
  res.status(201).send("주문하기");
};

const getOrders = (req, res) => {
  res.status(201).send("주문 목록 조회");
};

const getOrderDetail = (req, res) => {
  res.status(201).send("주문 상세 상품 조회");
};

module.exports = { order, getOrders, getOrderDetail };
