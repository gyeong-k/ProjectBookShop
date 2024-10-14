const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");

const order = (req, res) => {
  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    user_id,
    firstBookTitle,
  } = req.body;
  let delivery_id = 3;
  let order_id = 2;

  let sql =
    "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];

  // conn.query(sql, values, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
  //   }
  //   delivery_id = results.insertId;
  //   return res.status(StatusCodes.OK).json(results);
  // });
  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
          VALUES (?, ?, ?, ?, ?);`;
  values = [firstBookTitle, totalQuantity, totalPrice, user_id, delivery_id];
  // conn.query(sql, values, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
  //   }
  //   order_id = results.insertId;
  //   console.log(order_id);
  //   return res.status(StatusCodes.OK).json(results);
  // });
  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;

  values = [];
  items.forEach((item) => values.push([order_id, item.book_id, item.quantity]));
  conn.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    order_id = results.insertId;
    console.log(order_id);
    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrders = (req, res) => {
  res.status(201).send("주문 목록 조회");
};

const getOrderDetail = (req, res) => {
  res.status(201).send("주문 상세 상품 조회");
};

module.exports = { order, getOrders, getOrderDetail };
