const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken"); //jwt 모듈
const dotenv = require("dotenv"); //dotenv 모듈
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  let sql = "INSERT INTO users (email, password) VALUES (?,?)";
  let values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    console.log("로그인 results : ", results);
    const loginUser = results[0];

    if (loginUser && loginUser.password == password) {
      //토큰 발생
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "kk",
        }
      );
      //토큰 쿠키에 담기
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log("token: ", token);

      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json(results); //401:Unauthorized비인증 / 403:Forbidden접근 관리 없음
    }
  });
};

const passwordResetRequest = (req, res) => {
  res.status(200).send("비번 초기화 요청"); //
};

const passwordReset = (req, res) => {
  res.status(200).send("비번 초기화"); //
};

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset,
};
