const conn = require("../mariadb"); //현재폴더의 상위 폴더
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken"); //jwt 모듈
const crypto = require("crypto"); // crypto 모듈 : 암호화
const dotenv = require("dotenv"); //dotenv 모듈
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;
  let sql = "INSERT INTO users (email, password, salt) VALUES (?,?,?)";

  //비밀번호 암호화
  //회원가입 시 비번 암호화해서 암호화된 비번과 솔트 값을 같이 DBd에 저장
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  //로그인 시 이메일과 비번(날것) => 솔트값 꺼내서 비번 암호화 해보고 => 디비 비번이랑 비교

  let values = [email, hashPassword, salt];

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
  const { email } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;
  let sql = "UPDATE users SET password=? WHERE email=?";
  let values = [password, email];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); //bad request
    }
    if (results.affectedRows == 0)
      return res.status(StatusCodes.BAD_REQUEST).end();
    else return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset,
};
