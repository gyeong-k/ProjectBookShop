//const conn = require("../mariadb"); //현재폴더의 상위 폴더
const mariadb = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book_shop", //내가 만든 스키마
    dateStrings: true,
  });
  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    user_id,
    firstBookTitle,
  } = req.body;

  let sql =
    "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = await conn.execute(sql, values);
  let delivery_id = results.insertId;

  //orders 테이블 삽입
  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
          VALUES (?, ?, ?, ?, ?)`;
  values = [firstBookTitle, totalQuantity, totalPrice, user_id, delivery_id];

  [results] = await conn.execute(sql, values);
  let order_id = results.insertId;

  //아이템즈를 가지고 장바구니에서 조회
  sql = "SELECT book_id, quantity FROM cartItems WHERE id IN (?)";
  let [orderItems, field] = await conn.query(sql, [items]);

  //orderedbook 테이블 삽입
  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;
  values = [];
  orderItems.forEach((item) =>
    values.push([order_id, item.book_id, item.quantity])
  );
  results = await conn.query(sql, [values]);

  let result = await deleteCartItems(conn, otems);
  return res.status(StatusCodes.OK).json(result);
};

const deleteCartItems = async (conn, items) => {
  let sql = "DELETE FROM cartItems WHERE id = (?);";

  let result = await conn.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book_shop", //내가 만든 스키마
    dateStrings: true,
  });
  sql = `SELECT orders.id, created_at, address, receiver, contact,
          book_.title, total_quantity, total_price
          FROM orders LEFT JOIN delivery 
          ON orders.delivery_id = delivery.id;`;
  let [rows, field] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book_shop", //내가 만든 스키마
    dateStrings: true,
  });
  sql = `SELECT book.id, title, author, price, quantity
          FROM orderedBook LEFT JOIN books 
          ON orderedBook.book_id = books.id
          WHERE order_id=?;`;
  let [rows, field] = await conn.query(sql, [id]);
  return res.status(StatusCodes.OK).json(rows);
};

module.exports = { order, getOrders, getOrderDetail };
