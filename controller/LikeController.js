const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  //좋아요 추가
  const { id } = req.params; //bookid
  const { user_id } = req.body;

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);";
  let values = [user_id, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    return res.status(StatusCodes.OK).json(results);
  });
  res.status(201).send("좋아요 추가");
};

const removeLike = (req, res) => {
  //좋아요 제거
  const { id } = req.params; //bookid
  const { user_id } = req.body;

  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;";
  let values = [user_id, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    return res.status(StatusCodes.OK).json(results);
  });
  res.status(201).send("좋아요 삭제");
};

module.exports = {
  addLike,
  removeLike,
};
