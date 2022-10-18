const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../../models");
const { isTypedArray } = require("util/types");
const { readdirSync } = require("fs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");
const router = Router();


//http://localhost:8080/user/mypage
// router.post("/myPage", async (req, res, next) => {
//   console.log(req.body);
//   let { user_id } = req.body;
//   let checkEmail = await User.findOne({ user_id });

//   res.json({ user_id, password, name, profile_nick })
// });


//http://localhost:8080/user/signUp
router.post("/signUp", async (req, res, next) => {
  console.log(req.body);
  let { user_id, password, name, profile_nick, profile_img } = req.body;

  let checkEmail = await User.findOne({ user_id });

  if (checkEmail) {
    res.json({
      status: false,
      message: "존재하는 이메일입니다.",
    });
    return;
  }

  let hashPassword = passwordHash(password);

  await User.create({
    user_id,
    password: hashPassword,
    name,
    profile_nick,
    profile_img,
  });

  res.json({
    status: true,
    message: "회원가입이 완료되었습니다.",
  });
});


//http://localhost:8080/user/login
router.post("/login", async (req, res, next) => {
  let { user_id, password } = req.body;
  let checkEmail = await User.findOne({ user_id });

  if (!checkEmail) {
    res.json({
      status: false,
      message: "존재하지 않거나 일치하지 않는 이메일입니다.",
    });
    return;
  }

  let hashPassword = passwordHash(password);

  if (hashPassword !== checkEmail.password) {
    res.json({
      status: false,
      message: "비밀번호가 틀렸습니다.",
    });
    return;
  }

  jwt.sign(
    {
      user_id: checkEmail.user_id,
      name: checkEmail.name,
    },
    jwtConfig.secret,
    {
      expiresIn: "1d",
    },
    (error, token) => {
      if (error) {
        res.status(401).json({
          status: false,
          message: "토큰 발행 실패",
        });
      } else {
        res.json({
          status: true,
          aceessToken: token,
          user_id: checkEmail.user_id,
          name: checkEmail.name,
        });
      }
    }
  );
});

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};

module.exports = router;
