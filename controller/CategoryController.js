const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");

const allCategory = (req, res) => {
  let sql = "SELECT * FROM category";
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    if (results.length) return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  allCategory,
};
